import React,{Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {Content,Container} from 'native-base';
import NavBarOpener from './NavBarOpener';
import MailFooter from './MailFooter';
import MailItem from './MailItem';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

export default class ViewMailsScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            toOpen:props.navigation.getParam("category","inbox"),
            title:"Mesaje primite",
            currentlySelectedCategory:props.navigation.getParam("category","inbox"),
            inbox:[],
            drafts:[],
            sent:[],
            shownItems:[],
            selectedMails:[]
        }

        this.composeMail = this.composeMail.bind(this);
        this.viewInbox = this.viewInbox.bind(this);
        this.viewDrafts = this.viewDrafts.bind(this);
        this.viewSent = this.viewSent.bind(this);
        this.viewMail = this.viewMail.bind(this);
        this.getEmails = this.getEmails.bind(this);
        this.getDrafts = this.getDrafts.bind(this);
        this.getSent = this.getSent.bind(this);
        this.getEmailsFromServer = this.getEmailsFromServer.bind(this);
        this.getDraftsFromServer = this.getDraftsFromServer.bind(this);
        this.getSentFromServer = this.getSentFromServer.bind(this);
        this.getAllFolders = this.getAllFolders.bind(this);
        this.setShownItems = this.setShownItems.bind(this);
        this.pickScreen = this.pickScreen.bind(this);
        this.manageSelectedMails = this.manageSelectedMails.bind(this);
        this.deleteSelectedMails = this.deleteSelectedMails.bind(this);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    }

    componentDidMount()
    {
        this.getAllFolders().then((arr)=>{
            this.setState({inbox:arr[0],drafts:arr[1],sent:arr[2]},()=>this.pickScreen());
        });
    }

    willFocus = this.props.navigation.addListener('willFocus',(payload) => {
            if(payload.action.params)
            {
                this.getAllFolders().then((arr)=>{
                    let newCategory=payload.action.params.category;
                    this.setState({toOpen:newCategory,inbox:arr[0],drafts:arr[1],sent:arr[2]},()=>{this.pickScreen()});
                });
            }
            else
            {
                this.getAllFolders().then((arr)=>{
                    let newCategory="inbox";
                    this.setState({toOpen:newCategory,inbox:arr[0],drafts:arr[1],sent:arr[2]},()=>{this.pickScreen()});
                });
            }
        }
    );

    render()
    {    
        return (
        <Container>
            <NavBarOpener navigation={this.props.navigation}/>

            <Content style={styles.content}>
                <View style={styles.pageContainer}>
                    <Text style={styles.title}>
                        {this.state.title}
                    </Text>

                    <View style={styles.options}>
                        <Icon2.Button style={styles.iconButton} iconStyle={styles.icon} backgroundColor="#2670b5" name='delete' size={30} onPress={()=>this.deleteSelectedMails()}/>
                    </View>

                    <ScrollView style={styles.mailsList}>
                        {this.state.shownItems}
                    </ScrollView>
                </View>
            </Content>

            <TouchableOpacity onPress={this.composeMail} style={styles.composeButton}>
                <Icon name='plus' style={styles.composeIcon} size= {30}/>
            </TouchableOpacity>

            <MailFooter viewInbox={this.viewInbox} viewDrafts={this.viewDrafts} viewSent={this.viewSent}/>
        </Container>
        );
    }

    async getAllFolders()
    {
        return await Promise.all([this.getEmailsFromServer(),this.getDraftsFromServer(),this.getSentFromServer()]);
    }

    pickScreen()
    {
        let category=this.state.toOpen;

        if(category==="inbox")
        {
            this.viewInbox();
        }
        else
        {
            if(category==="drafts")
            {
                this.viewDrafts();
            }
            else
            {
                if(category==="sent")
                {
                    this.viewSent();
                }
            }
        }
    }

    manageSelectedMails(mail,value)
    {
        if(value)
        {
            this.state.selectedMails.push(mail);
        }
        else
        {
            this.state.selectedMails.splice(this.state.selectedMails.indexOf(mail),1);
        }
    }

    deleteSelectedMails()
    {
        let newItems=[];
        let idArray=[];

        for(let i=0;i<this.state.shownItems.length;i++)
        {
            let found=false;

            for(let j=0;j<this.state.selectedMails.length;j++)
            {
                if(this.state.shownItems[i].props.mailData.id===this.state.selectedMails[j].id)
                {
                    found=true;
                    idArray.push(this.state.selectedMails[j].id);
                    break;
                }
            }

            if(!found)
            {
                newItems.push(this.state.shownItems[i]);
            }
        }

        this.setState({shownItems:newItems});

        this.sendDeleteRequest(idArray);
    }

    sendDeleteRequest(idArray)
    {
        let source=this.state.currentlySelectedCategory;
		let location="";

		if(source==="inbox")
		{
			location="Inbox"
		}
		else
		{
			if(source==="drafts")
			{
				location="Drafts";
			}
			else
			{
				if(source==="sent")
				{
					location="Sent";
				}
			}
		}
        
		fetch('http://192.168.0.181:8080/api/all/emails/delete/'+location, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				},
			body:JSON.stringify({
				idArray:idArray
			})
        });
        

    }

    viewInbox()
    {
        this.setState({title:"Mesaje primite",currentlySelectedCategory:"inbox"});
        this.getEmails();
    }

    viewDrafts()
    {
        this.setState({title:"Schițe",currentlySelectedCategory:"drafts"});
        this.getDrafts();
    }

    viewSent()
    {
        this.setState({title:"Mesaje trimise",currentlySelectedCategory:"sent"});
        this.getSent();
    }

    viewMail(mail,type)
    {
        let mailJson=JSON.stringify(mail);
        this.props.navigation.navigate('MailContent',{mail:mailJson,type:type});
    }

    composeMail()
    {
        this.props.navigation.navigate('SendMail');
    }

    setShownItems(items,destination,mailType)
    {
        let newItems=[];

        for(let i=0;i<items.length;i++)
        {
            let mail=items[i];
            let mailDestination;
            let read;

            if(destination==="from")
            {
                mailDestination=mail.from;
            }
            else
            {
                if(destination==="to")
                {
                    mailDestination=mail.to;
                }
            }

            if(mail.read==="false")
            {
                read=false;
            }
            else
            {
                read=true;
            }

            let item=<MailItem type={mailType} toFrom={destination} toFromText={mailDestination} date={mail.date} subject={mail.subject} read={read} viewMail={this.viewMail} mailData={mail} manageSelectedMails={this.manageSelectedMails}/>;
            newItems.push(item);
        }

        this.setState({shownItems:newItems});
    }

    async getEmailsFromServer()
    {
        let res= await fetch('http://192.168.0.181:8080/api/all/emails/getAll').then(res => res.json());
		return res;
    }

    getEmails()
	{
        this.setShownItems(this.state.inbox,"from","inbox");
    }

    async getDraftsFromServer()
    {
        let res= await fetch('http://192.168.0.181:8080/api/all/emails/getDrafts').then(res => res.json());
        return res;
    }
    
    getDrafts()
	{
        this.setShownItems(this.state.drafts,"to","drafts");
    }

    async getSentFromServer()
    {
        let res= await fetch('http://192.168.0.181:8080/api/all/emails/getSent').then(res => res.json());
		return res;
    }

	getSent()
	{
        this.setShownItems(this.state.sent,"to","sent");
    }
}

const styles = StyleSheet.create({
    content:{
        width: "100%",
        height: "100%"
    },
    pageContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "column",
    },
    title: {
      fontWeight: "bold",
      fontSize: 30
    },
    composeButton:{
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#324ea8',
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    composeIcon:{
    },
    options:{
        flex: 1,
        flexDirection: "row",
        height:"10%",
        width: "100%",
        alignItems: "flex-start",
        margin: 10
    },
    mailsList:{
        flex: 6,
        width: "100%",
        height: "70%",
        borderStyle: "solid",
        borderTopWidth: 2,
        borderColor: "grey",
    },
    iconButton:{
        textAlign: "center",
        justifyContent: "center",
        height: "100%"
    },
    icon:{
        marginLeft:"10%"
    }
});