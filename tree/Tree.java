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
 		Node newNode = new Node(id, name, null, 0, 0, 0, 0);
    rootNode = newNode;
  	names.put(id, rootNode);
 	}

 	public void addChild(String id, String name, String root) {
 		if (names.get(id) != null) {
 			System.err.println("Error: name taken.");
 			return;
 		}

 		Node parent = names.get(root);

 		if (parent == null) {
 			System.err.println("Error: the parent does not exist.");
 			return;
 		}

 		Node child = new Node(id, name, parent, 0, 0, 0, 0);
    parent.addChild(child);
 		names.put(id, child);
    System.err.println("success");
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
      delll.getParent().delChild(delll);
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

  public String getFullInf(String id) {

  	Node node = names.get(id);

  	if (node == null)
    {
      return "Error: the company with the name \"" + id + "\" was not found!";
    }

    String result = "{";
    result += "\"id\":\"" + node.getID() + "\"";
    result += ",\"name\":\"" + node.getName() + "\"";
    result += ",\"cost\":" + node.getCost();
    result += ",\"cost_import\":" + node.getCostImport();
    result += ",\"volume\":" + node.getVolume();
    result += ",\"volume_import\":" + node.getVolumeImport();

    result += ",\"path\":[";
    Node path = node;
    while (path != rootNode)
    {
      result += "{\"id\":\"" + path.getID();
      result += "\",\"name\":\"" + path.getName();
      result += "\"}";
      result += ",";
      path = path.getParent();        
    }
    result += "{\"id\":\"" + path.getID();
    result += "\",\"name\":\"" + path.getName();
    result += "\"}";
    result += "]";


    result += ",\"daughters\":[";
    Node dot;
    for (int i = 0; i < node.getLenChilds() - 1; i++) {
      dot = node.getChild(i);
      result += "{";
      result += "\"id\":\"" + dot.getID() + "\"";
      result += ",\"name\":\"" + dot.getName() + "\"";
      result += ",\"cost\":" + dot.getCost();
      result += ",\"cost_import\":" + dot.getCostImport();
      result += ",\"volume\":" + dot.getVolume();
      result += ",\"volume_import\":" + dot.getVolumeImport();
      result += "}";
      result += ",";
    }
    if (node.getLenChilds() > 0)
    {
      dot = node.getChild(node.getLenChilds() - 1);
      result += "{";
      result += "\"id\":\"" + dot.getID() + "\"";
      result += ",\"name\":\"" + dot.getName() + "\"";
      result += ",\"cost\":" + dot.getCost();
      result += ",\"cost_import\":" + dot.getCostImport();
      result += ",\"volume\":" + dot.getVolume();
      result += ",\"volume_import\":" + dot.getVolumeImport();
      result += "}";
    }
    result += "]"; 

    result += ",\"projects\":[";
    Project project;
    for (int i = 0; i < node.getLenProject() - 1; i++) {
      project = node.getProject(i);
      result += "{";
      result += "\"id\":\"" + project.getID() + "\"";
      result += ",\"name\":\"" + project.getName() + "\"";
      result += ",\"descriprion\":\"" + project.getDescriptoin() + "\"";
      result += ",\"status\":\"" + project.getStatus() + "\"";
      result += ",\"cost\":" + project.getCost();
      result += ",\"cost_import\":" + project.getCostImport();
      result += ",\"volume\":" + project.getVolume();
      result += ",\"volume_import\":" + project.getVolumeImport();
      result += "}";
      result += ",";
    }
    if (node.getLenProject() > 0)
    {
      project = node.getProject(node.getLenProject() - 1);
      result += "{";
      result += "\"id\":\"" + project.getID() + "\"";
      result += ",\"name\":\"" + project.getName() + "\"";
      result += ",\"descriprion\":\"" + project.getDescriptoin() + "\"";
      result += ",\"status\":\"" + project.getStatus() + "\"";
      result += ",\"cost\":" + project.getCost();
      result += ",\"cost_import\":" + project.getCostImport();
      result += ",\"volume\":" + project.getVolume();
      result += ",\"volume_import\":" + project.getVolumeImport();
      result += "}";
    }
    result += "]";

    result += "}";
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
