package tree;

import java.io.Serializable;

class Project implements Serializable {
  private String name;
  private String status;
  private String descriptoin;
  private int cost;
  private int volume;
  private int part;
  private String division;
  private String direction;

  public Project(String name, String status, String descriptoin, int cost, int volume, int part, String division, String direction) {
    this.name = name;
    this.status = status;
    this.descriptoin = descriptoin;
    this.cost = cost;
    this.volume = volume;
    this.part = part;
    this.division = division;
    this.direction = direction;
  }

  public String getName()
  {
    return name;
  }
  public String getStatus()
  {
    return status;
  }
  public String getDescriptoin()
  {
    return descriptoin;
  }
  public int getCost()
  {
    return cost;
  }
  public int getVolume()
  {
    return volume;
  }
  public int getPart()
  {
    return part;
  }
  public String getDivision()
  {
    return division;
  }
  public String getDirection()
  {
    return direction;
  }
}