import { Deserializable } from './deserializable.model';


export class Skill implements Deserializable{

  skillId : number;
  name : string;
  desc : string;
  iconPath : string;
  skillLvls : [{
    skillLvl : number,
    lvlDesc : string
  }]

  deserialize(input : any) {
    Object.assign(this, input);
    return this;
  }
}
