import { Component, OnInit } from '@angular/core';
import { Contacts, Contact, ContactName, ContactField } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ToastController } from '@ionic/angular';

@Component({
   selector: 'app-contact',
   templateUrl: './contact.page.html',
   styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

   myContacts: Contact[] = [];
   constructor(private contacts: Contacts, private callNumber: CallNumber, private sms: SMS, private toastCtrl: ToastController) { }


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

   sendSms(contact: Contact) {
      this.sms.send(contact.phoneNumbers[0].value, 'This is a message for you');
   }

   call(contact: Contact) {
      this.callNumber.callNumber(contact.phoneNumbers[0].value, true);
   }

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
}
