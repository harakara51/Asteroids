package controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import entities.Asteroid;
import data.asteroidDAO;



@Controller
public class myController
{
	
	public static int counter;
	@Autowired
	asteroidDAO asteroidDAO;

	@ResponseBody
	@RequestMapping("ping")
	
	public String ping()
	{

		return "pong";
	}

	
	@ResponseBody
	@RequestMapping("highScores")
	
	public List<Asteroid> getALLdays()

	{ 
		
		counter++;
		System.out.println(counter);
		System.out.println("inside controller A");
		
		List<Asteroid> top10 = new ArrayList<>();
//		
		List<Asteroid>allScores = asteroidDAO.getAllScores();
//		
//		
		for (int i =0; i <11; i ++)
		{

			top10.add(allScores.get(i));
		}
		System.out.println(asteroidDAO.getAllScores());
		
		return top10;
		
	}

	
	@ResponseBody
    @RequestMapping(path = "newScore", method = RequestMethod.POST)
    public Boolean createLog(@RequestBody String asteroid) {
        System.out.println("inside createLOG method " + asteroid);

       asteroidDAO.createScore(asteroid);
        return true;
    }

}
