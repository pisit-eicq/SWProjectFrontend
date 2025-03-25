
export interface RestaurantItem{
  _id:string,
  name:string,
  address:string,
  tel:string,
  office_hours:{
      open:string,
      close:string,
      tz:string
  }
}

export interface RestaurantJson{
  success:boolean,
  count:number,
  data:RestaurantItem[]
}

export interface ReservationsJson{
  success:boolean,
  count:number,
  data:ReservationItem[]
}

export interface ReservationJson{
  success:boolean,
  data:ReservationItem[]
}

export interface ReservationItem{
  _id:string,
  apptDate:string,
  user:string,
  restaurant:RestaurantItem
}


export interface profile{
  _id:string,
  username:string,
  email:string,
  role:string,
  banned:boolean
}

export interface UserItem {
  _id: string;
  username: string;
  email: string;
  role: string;
  banned: boolean;
  createdAt: string;
  __v: number;
}

export interface UsersJson {
  success: boolean;
  count: number;
  data: UserItem[];
}
