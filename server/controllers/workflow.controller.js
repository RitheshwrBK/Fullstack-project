import { subscribe } from 'diagnostics_channel';
import { createRequire } from 'module';
import Subscription from '../models/subscription.models';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

export const sendReminders = serve( async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () =>{
        return Subscription.findById(subscriptionId).populate('user','name email')
    })
}