import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Invitations = new Mongo.Collection("invitations");

export const invitationsSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) return new Date();
      else if (this.isUpsert) return {$setOnInsert: new Date()};
      else this.unset();
    },
  },
  
  inviteeEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  
  referrerEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },

  visitCount: {
    type: Number,
    autoValue() {
     if (this.insert) return 0;
     else if (this.isUpsert) return {$setOnInsert: 0};
    },
    optional: true,
  },
  
  inviteeId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
});

Invitations.attachSchema(invitationsSchema);
