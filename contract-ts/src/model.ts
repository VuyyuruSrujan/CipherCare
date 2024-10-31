// import { near } from "near-sdk-js";

// export class PostedMessage {
//   static schema = {
//     'sender': 'string',
//     'first_name': 'string',
//     'last_name': 'string',
//     'email':'string',
//     'dob':'string',
//     'occupation':'string',
//     'Age' : 'string',
//   }

//     sender: string;
//     first_name: string;
//     last_name: string ;
//     email:string;
//     dob:string;
//     occupation:string;
//     Age:string;
//   constructor(sender: string, first_name:string,last_name:string, email:string ,dob:string, occupation:string, Age:string) {
//     this.sender = sender;
//     this.first_name = first_name;
//     this.last_name = last_name;
//     this.email = email;
//     this.dob = dob;
//     this.occupation = occupation;
//     this.Age = Age
//   }
// }

export class PostedMessage {
  static schema = {
    'sender': 'string',
    'first_name': 'string',
    'last_name': 'string',
    'email': 'string',
    'dob': 'string',
    'occupation': 'string',
    'Age': 'string',
  };

  sender: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  occupation: string;
  Age: string;

  constructor(sender: string, first_name: string, last_name: string, email: string, dob: string, occupation: string, Age: string) {
    this.sender = sender;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.dob = dob;
    this.occupation = occupation;
    this.Age = Age;
  }
}

export class Doctor {
  static schema = {
    'sender': 'string',
    'doctor_first_name': 'string',
    'doctor_last_name': 'string',
    'doctor_email': 'string',
    'doctor_dob': 'string',
    'doctor_specialization': 'string',
  };
  
  sender: string;
  doctor_first_name: string;
  doctor_last_name: string;
  doctor_email: string;
  doctor_dob: string;
  doctor_specialization: string;

  constructor(sender:string , doctor_first_name: string, doctor_last_name: string, doctor_email: string, doctor_dob: string, doctor_specialization: string) {
    this.sender = sender;
    this.doctor_first_name = doctor_first_name;
    this.doctor_last_name = doctor_last_name;
    this.doctor_email = doctor_email;
    this.doctor_dob = doctor_dob;
    this.doctor_specialization = doctor_specialization;
  }
}


export class DoctorRequest {
  static schema = {
   'from': 'string',
   'to': 'string',
   'Note': 'string',
   'Date': 'string',
  }

  from: string;
  to: string;
  Note: string;
  Date: string;

  constructor(from: string, to: string, Note: string) {
    this.from = from;
    this.to = to;
    this.Note = Note;
    this.Date = new Date().toISOString(); 
  }
}
