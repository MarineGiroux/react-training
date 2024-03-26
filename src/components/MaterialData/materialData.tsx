interface Material {
  name: string;
  format: string;
  length: number;
  width: number;
  thickness: number;
}

interface Value {
  value:string;
}

interface MaterialData {
  material: Material;
  value: Value;
  price: number;
}

interface DataProps{
  data:MaterialData[];    
}

function MaterialData({data}: DataProps){
}

export default MaterialData;