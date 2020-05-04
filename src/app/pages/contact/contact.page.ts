import { Component, OnInit } from '@angular/core';
import { Contacts, Contact, ContactName, ContactFieldType, IContactFindOptions } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS, SmsOptions } from '@ionic-native/sms/ngx';
import { ToastController, NavController } from '@ionic/angular';

@Component({
   selector: 'app-contact',
   templateUrl: './contact.page.html',
   styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

   contactsFound = [];
   ourtype: ContactFieldType[] = ["displayName"];

   // smsText: string;
   // myContacts: Contact[] = [];
   // constructor(private contacts: Contacts, private callNumber: CallNumber, private sms: SMS, private toastCtrl: ToastController) { }
   constructor(public navCtrl: NavController, private contacts: Contacts) {
      this.search('')
   }

   search(q) {
      const option: IContactFindOptions = {
         filter: q
      }
      this.contacts.find(this.ourtype, option).then(conts => {
         this.contactsFound = conts
      })
   }

   onKeyUp(ev) {
      this.search(ev.target.value);
   }

   // Call() {
   //    this.contacts.pickContact().then((contact) => {
   //       var contactNumber = contact.phoneNumber[0].value;

   //       this.callNumber.callNumber().then((data) => {
   //          alert(JSON.stringify(data));
   //       }, (err) => {
   //          alert(JSON.stringify(err));
   //       });
   //    }, (err) => {
   //       alert(JSON.stringify(err));
   //    })
   // }

   // Sms() {
   //    this.contacts.pickContact().then((contact) => {
   //       var contactNumber = contact.phoneNumbers[0].value;
   //       var options: SmsOptions ={
   //          replaceLineBreaks: false,
   //          android: {
   //             intent: 'INTENT'
   //          }
   //       }
   //       var message = this.smsText;
   //       this.sms.send(contactNumber, message, options).then((data) => {
   //          alert(JSON.stringify(data));
   //       }, (err)=> {
   //          alert(JSON.stringify(err));
   //       })

   //    }, (err) => {
   //       alert(JSON.stringify(err))
   //    })
   // }

   // loadContacts() {

   //    let options = {
   //       filter: '',
   //       multiple: true,
   //       hasPhoneNumber: true
   //    }

   //    this.contacts.find(['*'], options).then((contacts: Contact[]) => {
   //       this.myContacts = contacts;
   //       console.log('Contact: ', contacts)
   //    })
   // }

   // sendSms(contact: Contact) {
   //    this.sms.send(contact.phoneNumbers[0].value, 'Hi, This is a message from Cloud Ace Singapore');
   // }

   // call(contact: Contact) {
   //    this.callNumber.callNumber(contact.phoneNumbers[0].value, true);
   // }

   // createContact() {
   //    let contact: Contact = this.contacts.create();

   //    contact.name = new ContactName(null, 'Mike', 'Sihombing');
   //    contact.phoneNumbers = [new ContactField('mobile', '082256784040')];
   //    contact.save().then(
   //       async () => {
   //          let toast = await this.toastCtrl.create({
   //             message: 'Contact added!'
   //          });

   //          toast.present();
   //       },
   //       (error: any) => console.log('Error saving contact.', error)
   //    );
   // }

   doRefresh(event) {
      console.log('Begin async operation');

      setTimeout(() => {
         console.log('Async operation has ended');
         event.target.complete();
      }, 2000);
   }

}
