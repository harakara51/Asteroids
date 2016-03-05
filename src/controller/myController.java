package controller;

import java.util.ArrayList;
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
		return asteroidDAO.getAllScores();
		
	}

	
	@ResponseBody
    @RequestMapping(path = "newScore", method = RequestMethod.POST)
    public Boolean createLog(@RequestBody String asteroid) {
        System.out.println("inside createLOG method " + asteroid);

       asteroidDAO.createScore(asteroid);
        return true;
    }

}
