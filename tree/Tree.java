package tree;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;

class Tree implements Serializable {
	private static final long serialVersionUID = 1L;
	private Node rootNode;
	private LinkedHashMap <String, Node> names = new LinkedHashMap <String, Node>();

 	public Tree() {
  	rootNode = null;
	}

	public Node getRootNode() {
		return rootNode;
	}

 	public void iniRoot(String id, String name) {
 		Node newNode = new Node();
     	newNode.setNameSite(id);
      newNode.setNameUser(name);
      rootNode = newNode;
  	names.put(id, rootNode);
 	}

 	public void insert(String id, String name, String root) {
 		if (names.get(id) != null) {
 			System.err.println("Error: name taken.");
 			return;
 		}

 		Node parent = names.get(root);

 		if (parent == null) {
 			System.err.println("Error: the parent does not exist.");
 			return;
 		}

 		Node child = new Node();
 		child.setNameSite(id);
    child.setNameUser(name);
 		child.setParent(parent);
 		parent.addChild(child);
 		names.put(id, child);
 	}

  public void del(String name) {
    Node delll = names.get(name);

    if (delll == null) {
      System.err.println("Error: there is no node with this name");
      return;
    }

    if (delll == rootNode) {
      rootNode = null;
    } else {
      (delll.getParent()).delChild(delll);
      delll = null;
    }
    names.remove(name);

  }

  public void addProject(String name, Project project) {
  	Node add = names.get(name);

  	if (add == null) {
      System.err.println("Error: there is no node with this name");
      return;
    }

    if (add.nameProjectTaken(project.getID()))
    {
      System.err.println("Error: project name taken.");
      return;
    }

    add.addProject(project);
    return;
  }

  public String getFullInf(String name) {

  	Node node = names.get(name);

  	if (node == null)
    {
      //System.err.println("Error: there is no node with this name");
      return "error";
    }

    String result = "{\"id\":\"" + node.getID() + "\",\"name\":\"" + node.getName() + "\",\"projects\":[";
    Project project;

    for (int i = 0; i < node.getLenProject(); i++) {
      project = node.getProject(i);
      result += "{\"id\":\"" + project.getID();
      result += "\",\"name\":\"" + project.getName();
      result += "\",\"descriprion\":\"" + project.getDescriptoin();
      result += "\",\"stat\":\"" + project.getStatus();
      result += "\",\"cost\":\"" + project.getCost();
      result += "\",\"volume\":\"" + project.getVolume();
      result += "\",\"part\":\"" + project.getPart();
      result += "\",\"podr\":\"" + project.getDivision();
      result += "\",\"napr\":\"" + project.getDirection();
      result += "\"}";
      if (i + 1 < node.getLenProject()) {
        result += ",";
      }
    }

    result += "],\"daughters\":[";
    Node dot;

    for (int i = 0; i < node.getLenChilds(); i++) {
      dot = node.getChild(i);
      result += "{\"id\":\"" + dot.getID();
      result += "\",\"name\":\"" + dot.getName();
      result += "\",\"pr1\":\"p1\",\"pr2\":\"p2\"}";
      if (i + 1 < node.getLenChilds()) {
        result += ",";
      }
    }

    result += "]}";
    return result;
  }


 	public void printTree() {
 		if (rootNode == null) {
 			System.err.println("Error: the tree is empty.");
 			return;
 		}
 		rootNode.printNode("");
 	}
}
