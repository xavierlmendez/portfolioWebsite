import twilio from "twilio";

export type TwilioCredentials = {
    accountSid: string;
    authToken: string;
};

export type SendTextInput = TwilioCredentials & {
    from: string;
    to: string;
    body?: string;
    symbols?: string[];
};

/**
 * Main helper: create a one-off Twilio client from credentials you provide
 * and send a single SMS.
 */
export async function sendText(input: SendTextInput) {
    const { accountSid, authToken, from, to, body, symbols } = input;

    if (!accountSid || !authToken) {
        throw new Error("Missing Twilio credentials (accountSid or authToken).");
    }

    console.log(from)
    console.log(to)
    if (!from || !to) {
        throw new Error('Both "from" and "to" phone numbers are required.');
    }

    const optedInNumbers = {
        myNumber : 6282344038
    }

    const client = twilio(accountSid, authToken);

    const resolvedBody =
        body ??
        [
            "Guinea Pig SMS Interface Wrapper 🐹",
            "",
            symbols && symbols.length
                ? `Items: ${symbols.join(", ")}`
                : "(no symbols provided)",
        ].join("\n");

    const msg = await client.messages.create({
        from,
        to,
        body: resolvedBody,
    });

    return {
        success: true as const,
        sid: msg.sid,
        status: msg.status,
        to: msg.to,
        from: msg.from,
        dateCreated: msg.dateCreated,
    };
}

export type AttachPhoneNumberInput = TwilioCredentials & {
    messagingServiceSid: string;
    phoneNumberSid: string;
};

export async function attachPhoneNumberToMessagingService(
    input: AttachPhoneNumberInput
) {
    const { accountSid, authToken, messagingServiceSid, phoneNumberSid } = input;

    if (!accountSid || !authToken) {
        throw new Error("Missing Twilio credentials (accountSid or authToken).");
    }

    if (!messagingServiceSid || !phoneNumberSid) {
        throw new Error(
            "Both messagingServiceSid and phoneNumberSid are required to attach a phone number."
        );
    }

    const client = twilio(accountSid, authToken);

    const phoneNumber = await client.messaging.v1
        .services(messagingServiceSid)
        .phoneNumbers.create({
            phoneNumberSid,
        });

    return {
        success: true as const,
        sid: phoneNumber.sid,
        serviceSid: phoneNumber.serviceSid,
        dateCreated: phoneNumber.dateCreated,
    };
}
