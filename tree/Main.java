package tree;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

class Main {
	public static void main (String args []) {

		Tree tree = new Tree();

       	try (ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("tree.save"))) {
	       	tree = (Tree) objectInputStream.readObject();
	       	objectInputStream.close();
       	}
       	catch(Exception ex){
            //System.out.println("Error: save file not found.");
            tree.iniRoot("GasProm");
        }

		if (args.length < 1) {
			System.out.println("Error: command not found");
		} else if (Integer.parseInt(args[0]) == 0) {

			tree.insert(args[1], args[2]);
			//tree.printTree();

		} else if (Integer.parseInt(args[0]) == 1) {

			tree.del(args[1]);
			tree.printTree();

		} else if (Integer.parseInt(args[0]) == 2) {
			Project newProject = new Project (args[2], args[3], args[4],
				Integer.parseInt(args[5]),
				Integer.parseInt(args[6]),
				Integer.parseInt(args[7]), args[8], args[9]);

			tree.addProject(args[1], newProject);
			tree.printTree();

		} else if (Integer.parseInt(args[0]) == 3) {

			System.out.println(tree.getFullInf(args[1]));

		} else if (Integer.parseInt(args[0]) == 4) {

			System.out.println(tree.getFullInf("GasProm"));

		} else if (Integer.parseInt(args[0]) == 5) {

			tree.printTree();

		} else {
			System.out.println("Error: unknown command id: \'" + args[0] + "\'");
		}

       	try (ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("tree.save"))) {
	       	objectOutputStream.writeObject(tree);
	       	objectOutputStream.close();
       	}
       	catch(Exception ex){
            System.out.println("Error: failed to save changes.");
        }
	}
}
