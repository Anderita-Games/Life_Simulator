 #pragma strict

//one bar
public var Hunger : UnityEngine.UI.Image;
public var Sleep : UnityEngine.UI.Image;
public var waitTime = 30.0f;

//news
public var News : UnityEngine.UI.Text;
public var News2 : UnityEngine.UI.Text;

//Possessions
public var Home : UnityEngine.UI.Text;
public var Bed : UnityEngine.UI.Text;
public var Job : UnityEngine.UI.Text;

//Currency
public var Monies : UnityEngine.UI.Text;
var Cash : int;
public var sp : int;
public var SkillPoints : UnityEngine.UI.Text;
//Tutorial
public var Store : GameObject;
//Time
public var time : UnityEngine.UI.Text;
var timem : int;
var timeh : int;
var timed : int;

var number : int;

function Start() {
	News.text = "Hello!";
	News2.text = "Press the Make Cash button to start!";
	
	Hunger.fillAmount = PlayerPrefs.GetFloat("HUNGER");
	Sleep.fillAmount = PlayerPrefs.GetFloat("ENERGY");
	
	Store.SetActive (false);
	while(true) {
        number = Random.Range(1,10);
		if (number == 1) {
			News2.text = News.text;
			News.text = "It is raining";
			if (PlayerPrefs.GetString("House") == "Cardboard") {
				if(PlayerPrefs.GetString("Bed") == "Cardboard") {
					News2.text = News.text;
					News.text = "Your Bed and House are destroyed from the rain";
					PlayerPrefs.SetString("House", "");
					PlayerPrefs.SetString("Bed", "");
				}
			}else if (PlayerPrefs.GetString("House") == "Wood Shack") {
				if(PlayerPrefs.GetString("Bed") == "Cardboard") {
					News2.text = News.text;
					News.text = "Your Bed is destroyed from the rain";
					PlayerPrefs.SetString("Bed", "");
				}
			}
		}
		yield WaitForSeconds(60);
    }
    
    while(true) {
    	timem += 1;
    	if (timem == 60) {
    		timem = 0;
    		timeh += 1;
    		if (timeh == 24) {
    			timeh = 0;
    			timed += 1;
    		}
    	}
    	yield WaitForSeconds(1);
    }
}
 //Hunger.fillAmount = PlayerPrefs.GetInt("Hunger");
 //Sleep.fillAmount = PlayerPrefs.GetInt("Sleep");
function Update() {
	//Reduce fill amount over 30 seconds
	Hunger.fillAmount -= .3f / waitTime * Time.deltaTime;
	Sleep.fillAmount -= .2f / waitTime * Time.deltaTime;
	//Currency
	Monies.text = "Cash: " + PlayerPrefs.GetInt("Money");
	SkillPoints.text = "SP: " + PlayerPrefs.GetInt("sp");
	Home.text = "House: " + PlayerPrefs.GetString("House");
	Bed.text = "Bed: " + PlayerPrefs.GetString("Bed");
	Job.text = "Job: " + PlayerPrefs.GetString("Job");
	
	time.text = "Time: " + timed + " : " + timeh + " : " + timem;
	
	if (Hunger.fillAmount == 0) {
		PlayerPrefs.SetString("Death", "true");
	}
	if (Sleep.fillAmount == 0) {
		PlayerPrefs.SetString("Death", "true");
	}
	if (PlayerPrefs.GetString("Death") == "true") {
		News2.text = News.text;
		News.text = "You died and all your stats have restarted";
		Debug.Log("User Died");
		PlayerPrefs.DeleteAll();
		Hunger.fillAmount = 1;
		Sleep.fillAmount = 1;
	}
	
	//Bars
	PlayerPrefs.SetFloat("HUNGER", Hunger.fillAmount);
	PlayerPrefs.SetFloat("ENERGY", Sleep.fillAmount);
}

function Money() {
	Cash = PlayerPrefs.GetInt("Money");
	sp = PlayerPrefs.GetInt("sp");
	
	if (PlayerPrefs.GetString("Job") == "Beggar") {
		Cash += 1;
		sp += 1;
		Hunger.fillAmount -= .015;
		Sleep.fillAmount -= .02;
	}else if (PlayerPrefs.GetString("Job") == "Scam Artist") {
		Cash += 3;
		sp += 1;
		Hunger.fillAmount -= .025;
		Sleep.fillAmount -= .02;
		number = Random.Range(1,10000);
		if (number == 1) {
			News2.text = News.text;
			News.text = "You get scammed!";
			Cash = 0;
		}
	}else if (PlayerPrefs.GetString("Job") == "Thief") {
		Cash += 10;
		sp += 2;
		Hunger.fillAmount -= .035;
		Sleep.fillAmount -= .03;
		number = Random.Range(1,1000);
		if (number == 1) {
			News2.text = News.text;
			News.text = "You get caught and have to pay all your cash!";
			Cash = 0;
		}
	}else if (PlayerPrefs.GetString("Job") == "Paper Salesman") {
		Cash += 25;
		sp += 2;
		Hunger.fillAmount -= .015;
		Sleep.fillAmount -= .03;
	}else if (PlayerPrefs.GetString("Job") == "Human Lab Rat") {
		Cash += 50;
		sp += 1;
		Hunger.fillAmount -= .035;
		Sleep.fillAmount -= .03;
		number = Random.Range(1,1000);
		if (number == 1) {
			News2.text = News.text;
			News.text = "You die from the experiment!";
			Cash = 0;
			PlayerPrefs.SetString("Death", "true");
		}
	}else if (PlayerPrefs.GetString("Job") == "Cop") {
		Cash += 75;
		sp += 3;
		Hunger.fillAmount -= .03;
		Sleep.fillAmount -= .025;
		number = Random.Range(1,1000);
		if (number == 1) {
			News2.text = News.text;
			News.text = "You get shot and die on the job!";
			Cash = 0;
			PlayerPrefs.SetString("Death", "true");
		}
	}else if (PlayerPrefs.GetString("Job") == "Programmer") {
		Cash += 125;
		sp += 5;
		Hunger.fillAmount -= .025;
		Sleep.fillAmount -= .02;
		number = Random.Range(1,1000);
		if (number == 1) {
			News2.text = News.text;
			News.text = "You get hacked and lose all cash!";
			Cash = 0;
		}
	}else if (PlayerPrefs.GetString("Job") == "Hacker") {
		Cash += 1000;
		sp += 10;
		Hunger.fillAmount -= .010;
		Sleep.fillAmount -= .005;
		number = Random.Range(1,1000);
		if (number == 1) {
			News2.text = News.text;
			News.text = "You get caught by the FBI and lose all cash!";
			Cash = 0;
		}
	}else if (PlayerPrefs.GetString("Job") == "Rapper") {
		Cash += 10000;
		sp += 100;
		Hunger.fillAmount -= .005;
		Sleep.fillAmount -= .005;
	} else {
		Cash += 1;
		sp += 1;
		Hunger.fillAmount -= .015;
		Sleep.fillAmount -= .02;
	}
	PlayerPrefs.SetInt("sp", sp);
	PlayerPrefs.SetInt("Money", Cash);
}

function Rest() {
	if (PlayerPrefs.GetString("Bed") == "Cardboard") {
		Sleep.fillAmount += .2;
		Hunger.fillAmount -= .06;
	}else if (PlayerPrefs.GetString("Bed") == "Trash Mattress") {
		Sleep.fillAmount += .3;
		Hunger.fillAmount -= .06;
	}else if (PlayerPrefs.GetString("Bed") == "Camp Mattress") {
		Sleep.fillAmount += .4;
		Hunger.fillAmount -= .06;
	}else if (PlayerPrefs.GetString("Bed") == "Decent Mattress") {
		Sleep.fillAmount += .5;
		Hunger.fillAmount -= .06;
	}else if (PlayerPrefs.GetString("Bed") == "Great Mattress") {
		Sleep.fillAmount += .7;
		Hunger.fillAmount -= .04;
	}else if (PlayerPrefs.GetString("Bed") == "WaterBed 9000") {
		Sleep.fillAmount += 1;
		Hunger.fillAmount -= .01;
	}else {
		Sleep.fillAmount += .1;
		Hunger.fillAmount -= .06;
	}
}

function Feed() {
	Cash = PlayerPrefs.GetInt("Money");
	if (Cash > 1) {
		Cash -= 2;
		Monies.text = "Cash: " + PlayerPrefs.GetInt("Money");
		if (PlayerPrefs.GetString("Smoothie") == "true" && PlayerPrefs.GetString("Refrigerator") == "true") {
			Hunger.fillAmount += .5;
			Sleep.fillAmount -= .06;
		}else if (PlayerPrefs.GetString("smoothie") == "true") {
			Hunger.fillAmount += .2;
			Sleep.fillAmount -= .06;
		}else if (PlayerPrefs.GetString("refrigerator") == "true") {
			Hunger.fillAmount += .3;
			Sleep.fillAmount -= .06;
		}else {
			Hunger.fillAmount += .15;
			Sleep.fillAmount -= .06;
			number = Random.Range(1,1000);
			if (number == 1) {
				News2.text = News.text;
				News.text = "You die from food poisoning!";
				Cash = 0;
				PlayerPrefs.SetString("Death", "true");
			}
		}
		PlayerPrefs.SetInt("Money", Cash);
	}
}

function Shop() {
	if (Store.activeSelf == true) {
		Store.SetActive (false);
	}else if (Store.activeSelf == false) {
		Store.SetActive (true);
	}
}


