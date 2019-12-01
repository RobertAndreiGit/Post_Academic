package app.repo;

import app.domain.Ora;
import app.domain.Prezenta;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "ore", path = "ore")
public interface OraRepo extends PagingAndSortingRepository<Ora, Long> {
    
    List<Prezenta> findByStudent(@Param("student") Long student);
}