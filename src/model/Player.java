package model;

import java.util.ArrayList;

public class Player {

	private int id;
	private String name;
	private ArrayList<Integer> playerTerritories = new ArrayList<Integer>();

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<Integer> getPlayerTerritories() {
		return playerTerritories;
	}
	public void setPlayerTerritories(ArrayList<Integer> playerTerritories) {
		this.playerTerritories = playerTerritories;
	}

	public void addTerritory(Territory territory) {

	}

	public void deleteTerritory(Territory territory) {
	
	}
	
	public boolean shifumi() {
	int min=1;
	int max=3;
		
	
		
		int attacker = min + (int)(Math.random() * ((max - min) + 1));
		
		int defender = min + (int)(Math.random() * ((max - min) + 1));
		
	
		
	if( attacker == 1) { 	System.out.println("pierre");}
	
	if( attacker == 2) { 	System.out.println("feuille");}
	
	if( attacker == 3) { 	System.out.println("ciseaux");}
	
	
		
	if( defender == 1) { 	System.out.println("pierre");}
	
	if( defender == 2) { 	System.out.println("feuille");}
	
	if( defender == 3) { 	System.out.println("ciseaux");}
	
		
	if( attacker==1 &&defender==1) {System.out.println("Recommencer");
	this.shifumi();
	}
	
	if( attacker==1 &&defender==2) {System.out.println("la feuille gagne");
	return false;
	}
	
	if( attacker==1 &&defender==3) {System.out.println("la pierre gagne");
	return true;
	}
	
	if( attacker==2 &&defender==1) {System.out.println("la feuille gagne");
	return true;
	}
	
	if( attacker==2 &&defender==2) {System.out.println("Recommencer");
	this.shifumi();
	}
	
	if( attacker==2 &&defender==3) {System.out.println("le ciseaux gagne");
	return false;
	}
	if( attacker==3 &&defender==1) {System.out.println("la pierre gagne");
	return false;
	}
	if(attacker==3 &&defender==2) {System.out.println("le ciseaux gagne");
	return true;
	}
	if( attacker==3 &&defender==3) {System.out.println("Recommencer");
	this.shifumi();
	}
	
	return false;	
		
		
		
	}
		
	}




