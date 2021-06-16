package tree;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

class Main 
{
	public static void main (String args []) 
	{
		Tree tree = new Tree();
		String null_id = "Gazprom";
		String null_name = "Газпром";

       	try (ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("tree.save"))) {
	       	tree = (Tree) objectInputStream.readObject();
	       	objectInputStream.close();
       	}
       	catch(Exception ex)
       	{
            tree.iniRoot(null_id, null_name);
        }

		if (args.length < 1) 
		{
			System.out.println("Error: command not found!");
		} 
		else if (Integer.parseInt(args[0]) == 0)
		{
			if (args.length < 3)
			{
				System.out.print("Error: not enough arguments!");	
			}
			else if (args[1] == "" || args[2] == "" || args[3] == "")
			{
				System.out.print("Error: null arguments!");
			}
			else
			{
				System.out.print(tree.addChild(args[1], args[2], args[3]));
			}
		} 
		else if (Integer.parseInt(args[0]) == 1) 
		{
			tree.del(args[1]);
			tree.printTree();
		} 
		else if (Integer.parseInt(args[0]) == 2) 
		{
			Project newProject = new Project (args[2], args[3], args[4], args[5],
				Long.parseLong(args[6]),
				Long.parseLong(args[7]),
				Long.parseLong(args[8]), 
				Long.parseLong(args[9]));

			tree.addProject(args[1], newProject);
		} 
		else if (Integer.parseInt(args[0]) == 3) 
		{
			if (args.length < 2)
			{
				System.out.print("Error: invalid request!");
			}
			else
			{
				System.out.print(tree.getFullInf(args[1]));				
			}
		} 
		else if (Integer.parseInt(args[0]) == 4) 
		{
			System.out.print(tree.getFullInf(null_id));

		} 
		else if (Integer.parseInt(args[0]) == 5) 
		{
			tree.printTree();
		}
		else 
		{
			System.out.println("Error: unknown command id: \'" + args[0] + "\'");
		}

       	try (ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("tree.save"))) 
       	{
	       	objectOutputStream.writeObject(tree);
	       	objectOutputStream.close();
       	}
       	catch(Exception ex)
       	{
            System.out.println("Error: failed to save changes.");
        }
	}
}