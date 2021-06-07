package tree;

import java.io.Serializable;

class Project implements Serializable {
  String name;
  String status;
  String descriptoin;
  int cost;
  int volume;
  int part;
  String division;
  String direction;

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
}