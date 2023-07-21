
import '@/commands';
import '@/events';
import { SHARED_CONSTANTS } from '@ziim/shared';
import bcrypt from 'bcryptjs'
import { db } from '@ziim/db';
import { Characters, Inventory } from '@ziim/db/schemas';


db.query.Accounts.findFirst().then((res) => {
    if (res === undefined) {
        console.log("Invalid Username or Password")
    } else {
        console.log(res.password)
        bcrypt.compare('test', res.password).then((pass) => {
            if (pass) {
                console.log("LogedIn")
            } else {
                wconsole.log("Wrong password")
            }
        }).catch((error) => {
            console.error(error)
        })
    }
}).catch((err) => {
    console.error(err)
})


db.transaction(async (tx) => {
    const accountId = await tx.query.Accounts.findFirst();

    if (accountId?.id === undefined) {
        tx.rollback()
        return;
    }
    return await tx.insert(Characters).values({
        firstName: "Test",
        lastName: "Ziim",
        accountId: accountId.id,
        phoneNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
    }).returning()
}).then((res) => {
    console.log("Success", res)
}).catch((err) => {
    console.error("Error", err)
})

db.transaction(async (tx) => {
    const character = await tx.query.Characters.findFirst();

    if (character?.id === undefined) {
        tx.rollback()
        return;
    }
    return await tx.insert(Inventory).values({
        itemId: 1,
        characterId: character.id
    }).returning();
}).then((res) => {
    console.log("Success", res)

}).catch((err) => {
    console.error("Error", err)
})
console.log(SHARED_CONSTANTS.HELLO_WORLD);
console.log('This working');
console.log('This workisng');
