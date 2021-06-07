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

   	public void iniRoot(String name) {
   		Node newNode = new Node();
       	newNode.setName(name);
        rootNode = newNode;
    	names.put(name, rootNode);
   	}

   	public void insert(String name, String root) {
   		if (names.get(name) != null) {
   			System.err.println("Error: name taken.");
   			return;
   		}

   		Node parent = names.get(root);
   		if (parent == null) {
   			System.err.println("Error: the parent does not exist.");
   			return;
   		}

   		Node child = new Node();
   		child.setName(name);
   		child.setParent(parent);
   		parent.addChild(child);
   		names.put(name, child);
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
        add.addProject(project);
        return;
    }


    public String getFullInf(String name) {
    	Node node = names.get(name);
    	if (node == null) {
        	System.err.println("Error: there is no node with this name");
        	return "";
        }
        String result = "{\"name\":\"" + node.getName() + "\",\"projects\":[";
        Project project;
        for (int i = 0; i < node.getLenProject(); i++) {
          project = node.getProject(i);
          result += "{\"name\":\"" + project.name;
          result += "\",\"descriprion\":\"" + project.descriptoin;
          result += "\",\"stat\":\"" + project.status;
          result += "\",\"cost\":\"" + project.cost;
          result += "\",\"volume\":\"" + project.volume;
          result += "\",\"part\":\"" + project.part;
          result += "\",\"podr\":\"" + project.division;
          result += "\",\"napr\":\"" + project.direction;
          result += "\"}";
          if (i + 1 < node.getLenProject()) {
            result += ",";
          }
        }
        result += "],\"daughters\":[";
        for (int i = 0; i < node.getLenChilds(); i++) {
          result += "{\"name\":\"" + node.getChild(i).getName();
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
