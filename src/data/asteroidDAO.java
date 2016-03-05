package data;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Asteroid;



@Transactional
public class asteroidDAO {
	@PersistenceContext
	EntityManager em;

	public List<Asteroid>  getAllScores () {
	 
		List<Asteroid> allobj = (List<Asteroid>)em.createNamedQuery("getALL").getResultList();
	
		System.out.println(allobj.size());
//		TypedQuery<Asteroids> query =
//			      em.createNamedQuery("Country.findAll", Asteroid.class);
		return allobj;
	}
	

	
	public void createScore(String log) {
		
		ObjectMapper mapper = new ObjectMapper();
		Asteroid asteroid;
		try
		{
			System.out.println("before creating meditate object");
			asteroid = mapper.readValue(log, Asteroid.class);
			System.out.println(asteroid);
			em.persist(asteroid);
		} catch (JsonParseException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
	
	}
}
