package tree;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;

class Node implements Serializable {
  private Node parent;
  private String id;
  private String name;
  private ArrayList<Node> childs = new ArrayList<>(); 
  private int quantityChild = 0; 
  private ArrayList<Project> projects = new ArrayList<>(); 

  public void printNode(String tab) { 
    System.out.print(id);
    for(int i = 0; i < projects.size(); i++) {
      System.out.print(" " + projects.get(i).getID());
    }
    System.out.println();
    tab += "  ";       	
    for (int i = 0; i < childs.size(); i++) {
      System.out.print(tab);

      childs.get(i).printNode(tab);
    }
  }

  public boolean nameProjectTaken(final String name)
  {
    for(int i = 0; i < projects.size(); i++) {
      if(projects.get(i).getID().equals(name))
      {   
        return true;
      }
    }    
    return false;    
  }

  public String getID() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void addChild(final Node newChild) {
    childs.add(newChild);
  }

  public void setNameSite(final String id) {
    this.id = id;
  }

  public void setNameUser(final String name) {
    this.name = name;
  }

  public Node getChild(final int iterator) {
    return childs.get(iterator);
  }

  public Node getParent() {
    return parent;
  }

  public void setParent(final Node parent) {
    this.parent = parent;
  }

  public void addProject(final Project project) {
    projects.add(project);
  }

  public Project getProject(final int iterator) {
    return projects.get(iterator);
  }

  public int getLenProject() {
    return projects.size();
  }

  public int getLenChilds() {
    return childs.size();
  }

  public void delChild (final Node child) {
    childs.remove(child);
  }
}