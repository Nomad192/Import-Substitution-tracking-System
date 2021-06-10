package tree;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;

class Node implements Serializable {
  private String id;
  private String name;
  private Node parent;  
  private long cost;
  private long cost_import;
  private long volume;
  private long volume_import;  
  private ArrayList<Node> childs = new ArrayList<>(); 
  private ArrayList<Project> projects = new ArrayList<>(); 


  public Node(String id, String name, Node parent, long cost, long cost_import, long volume, long volume_import) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.cost = cost;
    this.cost_import = cost_import;
    this.volume = volume;
    this.volume_import = volume_import;
  }

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

    this.cost += project.getCost();
    this.cost_import += project.getCostImport();
    this.volume += project.getVolume();
    this.volume_import += project.getVolumeImport();

    Node path = parent;
    if (path != null)
    {
      while (!path.getID().equals("Gazprom"))
      {
        path.addProjectCost(
          project.getCost(), 
          project.getCostImport(), 
          project.getVolume(), 
          project.getVolumeImport());

        path = path.getParent();        
      }      
    }
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
  public void addProjectCost (long cost, long cost_import, long volume, long volume_import)
  {
    this.cost += cost;
    this.cost_import += cost_import;
    this.volume += volume;
    this.volume_import += volume_import;
  }
  public long getCost()
  {
    return cost;
  }
  public long getCostImport()
  {
    return cost_import;
  }
  public long getVolume()
  {
    return volume;
  }
  public long getVolumeImport()
  {
    return volume_import;
  }
}