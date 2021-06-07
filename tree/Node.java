package tree;

import java.io.Serializable;
import java.util.ArrayList;

class Node implements Serializable {
  private Node parent;
  private String name_site;
  private String name_user;
  private ArrayList<Node> childs = new ArrayList<>(); 
  private int quantityChild = 0; 
  private ArrayList<Project> projects = new ArrayList<>(); 

  public void printNode(String tab) { 
    System.out.print(name_site);
    for(int i = 0; i < projects.size(); i++) {
      System.out.print(" " + projects.get(i).getName());
    }
    System.out.println();
    tab += "  ";       	
    for (int i = 0; i < childs.size(); i++) {
      System.out.print(tab);

      childs.get(i).printNode(tab);
    }
  }

  public String getNameSite() {
    return name_site;
  }

  public String getName() {
    return name_user;
  }

  public void addChild(final Node newChild) {
    childs.add(newChild);
  }

  public void setNameSite(final String name_site) {
    this.name_site = name_site;
  }

  public void setNameUser(final String name_user) {
    this.name_user = name_user;
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