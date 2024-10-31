import { NearBindgen, near, call, view, Vector } from 'near-sdk-js'
import {PostedMessage , Doctor} from './model'

@NearBindgen({})
class GuestBook {
  messages: Vector<PostedMessage> = new Vector<PostedMessage>("v-uid");
  doctors: Vector<Doctor> = new Vector<Doctor>("d-uid");
  static schema = {
    messages: { class: Vector, value: PostedMessage },
    doctors: { class: Vector, value: Doctor }
  }

  @call({ payableFunction: true })
  add_message({first_name , last_name , email , dob , occupation , Age}: { first_name:string , last_name:string , email:string , dob:string , occupation:string , Age:string}) {
    const sender = near.predecessorAccountId();


    const message = new PostedMessage( sender ,first_name , last_name , email , dob , occupation , Age);
    this.messages.push(message);
    return message;
  }

  @view({})
  // Returns an array of messages with first_name, last_name, email, and dob.
  get_messages({ from_index = 0, limit = this.messages.length }: { from_index: number, limit: number }): Array<{ sender: string, first_name: string, last_name: string, email: string, dob: string , occupation:string , Age:string }> {
    // Fetch the messages and map them to include all details
    return this.messages.toArray().slice(from_index, from_index + limit).map((message: PostedMessage) => ({
      sender: message.sender,
      first_name: message.first_name,
      last_name: message.last_name,
      email: message.email,
      dob: message.dob,
      occupation :message.occupation,
      Age:message.Age
    }));
  }

  @view({})
  total_messages(): number { return this.messages.length }

  @call({})
  delete_all_messages(): void {
    // this.messages = new Vector<PostedMessage>("v-uid");
    this.messages.clear(); 
  }

  @call({ payableFunction: true })
  doctor_registration_details({doctor_first_name , doctor_last_name , doctor_email , doctor_dob , doctor_specialization}: { doctor_first_name:string , doctor_last_name:string , doctor_email:string , doctor_dob:string , doctor_specialization:string}) {
    const sender = near.predecessorAccountId();

    const doctor = new Doctor( sender ,doctor_first_name , doctor_last_name , doctor_email , doctor_dob , doctor_specialization);
    this.doctors.push(doctor);
    return doctor;
  }

  @view({})
  get_doctors({ from_index = 0, limit = this.doctors.length }) {
      const doctorList = this.doctors.toArray().slice(from_index, from_index + limit).map((doctor) => ({
        sender : doctor.sender,
        doctor_first_name: doctor.doctor_first_name,
        doctor_last_name: doctor.doctor_last_name,
        doctor_email: doctor.doctor_email,
        doctor_dob: doctor.doctor_dob,
        doctor_specialization: doctor.doctor_specialization
      }));
    // Debugging output
      return doctorList;
  }
  


  @view({})
  get_doctor_by_sender({ senderId }: { senderId: string }): { doctor_first_name: string, doctor_last_name: string, doctor_email: string, doctor_dob: string, doctor_specialization: string } | null {
    // Find the doctor with the matching senderId
    const doctor = this.doctors.toArray().find((doc: Doctor) => doc.sender === senderId);
    if (doctor) {
      return {
        doctor_first_name: doctor.doctor_first_name,
        doctor_last_name: doctor.doctor_last_name,
        doctor_email: doctor.doctor_email,
        doctor_dob: doctor.doctor_dob,
        doctor_specialization: doctor.doctor_specialization
      };
    }
    return null;
  }

  @call({})
  delete_all_doctors(): void {
    this.doctors.clear();
  }

  @view({})
  total_doctors(): number { return this.doctors.length }

}
