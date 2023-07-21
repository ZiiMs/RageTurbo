/* eslint-disable @typescript-eslint/no-misused-promises */
import { Accounts, db, eq, type DrizzleError } from "@ziim/db";



mp.events.add('playerJoin', async (player) => {
    const account = db.select().from(Accounts).where(eq(Accounts.scId, player.rgscId)).then(async (res) => {
        if (res.length > 0) {
            console.log("Found")
            return res;
        } else {
            console.log("Creating")
            const returnUser = db.insert(Accounts).values({
                scId: player.rgscId
            }).returning().then((res) => {
                console.log("Success")
                return res;
            }).catch((err: DrizzleError) => {
                console.error('CoError', err)
            })

            return returnUser
        }
    })
    console.log("Account!", await account)
})
