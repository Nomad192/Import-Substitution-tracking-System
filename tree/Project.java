package tree;

import java.io.Serializable;

class Project implements Serializable {
  private String id;
  private String name;
  private String status;
  private String descriptoin;
  private long cost;
  private long cost_import;
  private long volume;
  private long volume_import;

  public Project(String id, String name, String status, String descriptoin, long cost, long cost_import, long volume, long volume_import) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.descriptoin = descriptoin;
    this.cost = cost;
    this.cost_import = cost_import;
    this.volume = volume;
    this.volume_import = volume_import;
  }

  public String getID() {
    return id;
  }
  public String getName() {
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