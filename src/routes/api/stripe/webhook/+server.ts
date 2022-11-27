import type Stripe from 'stripe';
import {
    deleteApiMembership,
    deleteStrapiCMSMembership,
    insertApiMembership,
    insertStrapiCMSMembership
} from '$lib/core/services/membership.service';
import { getStrapiCMSUsers } from '$lib/core/services/user.service';
import { error, json } from '@sveltejs/kit';
import { updateApiStripeUserMetadata, updateStrapiCMSStripeUserMetadata } from '../../user-stripe-metadata.service';
import stripe from '../stripe';

const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET ?? "";

async function getUsers() {
    const users = await getStrapiCMSUsers();
    return users;
}

async function insertMembership(event: any, membership: any) {
    await insertApiMembership(event, membership);
    // await insertStrapiCMSMembership(membership);
    return "OK";
}

async function deleteMembership(data: any) {
    await deleteApiMembership(data);
    // await deleteStrapiCMSMembership(data);
    return "OK";
}

async function handleUserMetadata({ ctx, customer }: { ctx: any, customer: any }) {
    const users = await getUsers();
    const user = users?.find((user: { metadata: { stripe_id: any; }; }) => user?.metadata?.stripe_id === customer?.id);
    const data = { customer, metadata: { stripe_id: customer?.id, ...customer?.metadata } };
    await updateApiStripeUserMetadata(user, { event: ctx, ...data });
    // await updateStrapiCMSStripeUserMetadata(user, data);
    return "OK";
}

export async function POST(ctx: { request: any; }) {
    const request = ctx?.request;

    try {
        let event;
        const rawBody = Buffer.from(await request.arrayBuffer());
        const signature = request.headers.get('stripe-signature');

        if (STRIPE_ENDPOINT_SECRET) {
            try {
                event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_ENDPOINT_SECRET);
            } catch (err: any) {
                console.error(`Webhook Error: ${err?.message}`);
                throw error(500, err);
            }
        }

        let status,
            checkout,
            invoicePayment,
            customerId: any,
            account, users, user,
            externalAccount, configuration, balance, capability, cashBalance, charge,
            dispute, session, coupon, creditNote, customer: any,
            discount, source, subscription: any, taxId, file, verificationSession,
            invoice, invoiceitem, issuingAuthorization, issuingCard, issuingCardholder, issuingDispute,
            issuingTransaction, order, orderReturn, paymentIntent, paymentLink, paymentMethod, payout,
            person, plan: Stripe.Event.Data.Object, price: any, product: any, promotionCode, quote, earlyFraudWarning, recipient, reportRun,
            review, setupIntent, sku, taxRate, transaction, subscriptionSchedule, reader, testClock,
            topup, transfer, refund, scheduledQueryRun, mandate, userId, metadata: { code: any; plan: any; };

        console.log(event?.type);
        // Handle the event
        switch (event?.type) {
            case 'account.updated':
                account = event.data.object;
                // Then define and call a function to handle the event account.updated
                break;
            case 'account.external_account.created':
                externalAccount = event.data.object;
                // Then define and call a function to handle the event account.external_account.created
                break;
            case 'account.external_account.deleted':
                externalAccount = event.data.object;
                // Then define and call a function to handle the event account.external_account.deleted
                break;
            case 'account.external_account.updated':
                externalAccount = event.data.object;
                // Then define and call a function to handle the event account.external_account.updated
                break;
            case 'balance.available':
                balance = event.data.object;
                // Then define and call a function to handle the event balance.available
                break;
            case 'billing_portal.configuration.created':
                configuration = event.data.object;
                // Then define and call a function to handle the event billing_portal.configuration.created
                break;
            case 'billing_portal.configuration.updated':
                configuration = event.data.object;
                // Then define and call a function to handle the event billing_portal.configuration.updated
                break;
            case 'capability.updated':
                capability = event.data.object;
                // Then define and call a function to handle the event capability.updated
                break;
            case 'cash_balance.funds_available':
                cashBalance = event.data.object;
                // Then define and call a function to handle the event cash_balance.funds_available
                break;
            case 'charge.captured':
                charge = event.data.object;
                // Then define and call a function to handle the event charge.captured
                break;
            case 'charge.expired':
                charge = event.data.object;
                // Then define and call a function to handle the event charge.expired
                break;
            case 'charge.failed':
                charge = event.data.object;
                // Then define and call a function to handle the event charge.failed
                break;
            case 'charge.pending':
                charge = event.data.object;
                // Then define and call a function to handle the event charge.pending
                break;
            case 'charge.refunded':
                charge = event.data.object;
                // Then define and call a function to handle the event charge.refunded
                break;
            case 'charge.succeeded':
                charge = event.data.object;
                // Then define and call a function to handle the event charge.succeeded
                break;
            case 'charge.updated':
                charge = event.data.object;
                // Then define and call a function to handle the event charge.updated
                break;
            case 'charge.dispute.closed':
                dispute = event.data.object;
                // Then define and call a function to handle the event charge.dispute.closed
                break;
            case 'charge.dispute.created':
                dispute = event.data.object;
                // Then define and call a function to handle the event charge.dispute.created
                break;
            case 'charge.dispute.funds_reinstated':
                dispute = event.data.object;
                // Then define and call a function to handle the event charge.dispute.funds_reinstated
                break;
            case 'charge.dispute.funds_withdrawn':
                dispute = event.data.object;
                // Then define and call a function to handle the event charge.dispute.funds_withdrawn
                break;
            case 'charge.dispute.updated':
                dispute = event.data.object;
                // Then define and call a function to handle the event charge.dispute.updated
                break;
            case 'charge.refund.updated':
                refund = event.data.object;
                // Then define and call a function to handle the event charge.refund.updated
                break;
            case 'checkout.session.async_payment_failed':
                session = event.data.object;
                // Then define and call a function to handle the event checkout.session.async_payment_failed
                break;
            case 'checkout.session.async_payment_succeeded':
                session = event.data.object;
                // Then define and call a function to handle the event checkout.session.async_payment_succeeded
                break;
            case 'checkout.session.completed':
                session = event.data.object;
                // Then define and call a function to handle the event checkout.session.completed
                break;
            case 'checkout.session.expired':
                session = event.data.object;
                // Then define and call a function to handle the event checkout.session.expired
                break;
            case 'coupon.created':
                coupon = event.data.object;
                // Then define and call a function to handle the event coupon.created
                break;
            case 'coupon.deleted':
                coupon = event.data.object;
                // Then define and call a function to handle the event coupon.deleted
                break;
            case 'coupon.updated':
                coupon = event.data.object;
                // Then define and call a function to handle the event coupon.updated
                break;
            case 'credit_note.created':
                creditNote = event.data.object;
                // Then define and call a function to handle the event credit_note.created
                break;
            case 'credit_note.updated':
                creditNote = event.data.object;
                // Then define and call a function to handle the event credit_note.updated
                break;
            case 'credit_note.voided':
                creditNote = event.data.object;
                // Then define and call a function to handle the event credit_note.voided
                break;
            case 'customer.created':
                customer = event.data.object;
                handleUserMetadata({ ctx, customer });
                break;
            case 'customer.updated':
                customer = event.data.object;
                handleUserMetadata({ ctx, customer });
                break;
            case 'customer.deleted':
                customer = event.data.object;
                handleUserMetadata({ ctx, customer });
                break;
            case 'customer.discount.created':
                discount = event.data.object;
                // Then define and call a function to handle the event customer.discount.created
                break;
            case 'customer.discount.deleted':
                discount = event.data.object;
                // Then define and call a function to handle the event customer.discount.deleted
                break;
            case 'customer.discount.updated':
                discount = event.data.object;
                // Then define and call a function to handle the event customer.discount.updated
                break;
            case 'customer.source.created':
                source = event.data.object;
                // Then define and call a function to handle the event customer.source.created
                break;
            case 'customer.source.deleted':
                source = event.data.object;
                // Then define and call a function to handle the event customer.source.deleted
                break;
            case 'customer.source.expiring':
                source = event.data.object;
                // Then define and call a function to handle the event customer.source.expiring
                break;
            case 'customer.source.updated':
                source = event.data.object;
                // Then define and call a function to handle the event customer.source.updated
                break;
            case 'customer.subscription.created':
                subscription = event.data.object;
                customer = await stripe.customers.retrieve(subscription?.customer);
                metadata = customer?.metadata;
                plan = subscription?.plan;
                price = await stripe.prices.retrieve(plan?.id)
                product = await stripe.products.retrieve(plan?.product)
                users = await getUsers().catch(error => { console.log("customer.subscription.created error", error.message) });
                user = users?.find((user: { metadata: { stripe_id: any; }; }) => user?.metadata?.stripe_id === customer?.id);

                if (user) {
                    await insertMembership(ctx, {
                        user,
                        metadata,
                        name: product?.name,
                        price: price?.unit_amount,
                        subscription,
                        status: "COMPLETED"
                    }).then(res => {
                        console.log("Membership inserted");
                    }).catch(error => {
                        console.log(error?.message);
                    });
                }

                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                // Then define and call a method to handle the subscription created.
                // handleSubscriptionCreated(subscription);
                break;
            case 'customer.subscription.deleted':
                subscription = event.data.object;
                customer = await stripe.customers.retrieve(subscription?.customer);
                metadata = subscription?.metadata;
                plan = subscription?.plan;
                price = await stripe.prices.retrieve(plan?.id)
                product = await stripe.products.retrieve(plan?.product)
                users = await getUsers().catch(error => { console.log("customer.subscription.deleted error", error.message) });
                user = users?.find((user: { metadata: { stripe_id: any; }; }) => user?.metadata?.stripe_id === customer?.id);

                if (user) {
                    await deleteMembership({
                        user,
                        metadata,
                        name: product?.name,
                        price: price?.unit_amount,
                        subscription,
                        status: "COMPLETED"
                    }).catch(error => {
                        console.log(error?.message);
                    });
                }

                // Then define and call a function to handle the event customer.subscription.deleted
                break;
            case 'customer.subscription.pending_update_applied':
                subscription = event.data.object;
                // Then define and call a function to handle the event customer.subscription.pending_update_applied
                break;
            case 'customer.subscription.pending_update_expired':
                subscription = event.data.object;
                // Then define and call a function to handle the event customer.subscription.pending_update_expired
                break;
            case 'customer.subscription.trial_will_end':
                subscription = event.data.object;
                // Then define and call a function to handle the event customer.subscription.trial_will_end
                break;
            case 'customer.subscription.updated':
                subscription = event.data.object;
                // Then define and call a function to handle the event customer.subscription.updated
                break;
            case 'customer.tax_id.created':
                taxId = event.data.object;
                // Then define and call a function to handle the event customer.tax_id.created
                break;
            case 'customer.tax_id.deleted':
                taxId = event.data.object;
                // Then define and call a function to handle the event customer.tax_id.deleted
                break;
            case 'customer.tax_id.updated':
                taxId = event.data.object;
                // Then define and call a function to handle the event customer.tax_id.updated
                break;
            case 'file.created':
                file = event.data.object;
                // Then define and call a function to handle the event file.created
                break;
            case 'identity.verification_session.canceled':
                verificationSession = event.data.object;
                // Then define and call a function to handle the event identity.verification_session.canceled
                break;
            case 'identity.verification_session.created':
                verificationSession = event.data.object;
                // Then define and call a function to handle the event identity.verification_session.created
                break;
            case 'identity.verification_session.processing':
                verificationSession = event.data.object;
                // Then define and call a function to handle the event identity.verification_session.processing
                break;
            case 'identity.verification_session.requires_input':
                verificationSession = event.data.object;
                // Then define and call a function to handle the event identity.verification_session.requires_input
                break;
            case 'identity.verification_session.verified':
                verificationSession = event.data.object;
                // Then define and call a function to handle the event identity.verification_session.verified
                break;
            case 'invoice.created':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.created
                break;
            case 'invoice.deleted':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.deleted
                break;
            case 'invoice.finalization_failed':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.finalization_failed
                break;
            case 'invoice.finalized':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.finalized
                break;
            case 'invoice.marked_uncollectible':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.marked_uncollectible
                break;
            case 'invoice.paid':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.paid
                break;
            case 'invoice.payment_action_required':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.payment_action_required
                break;
            case 'invoice.payment_failed':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.payment_failed
                break;
            case 'invoice.payment_succeeded':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.payment_succeeded
                break;
            case 'invoice.sent':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.sent
                break;
            case 'invoice.upcoming':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.upcoming
                break;
            case 'invoice.updated':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.updated
                break;
            case 'invoice.voided':
                invoice = event.data.object;
                // Then define and call a function to handle the event invoice.voided
                break;
            case 'invoiceitem.created':
                invoiceitem = event.data.object;
                // Then define and call a function to handle the event invoiceitem.created
                break;
            case 'invoiceitem.deleted':
                invoiceitem = event.data.object;
                // Then define and call a function to handle the event invoiceitem.deleted
                break;
            case 'invoiceitem.updated':
                invoiceitem = event.data.object;
                // Then define and call a function to handle the event invoiceitem.updated
                break;
            case 'issuing_authorization.created':
                issuingAuthorization = event.data.object;
                // Then define and call a function to handle the event issuing_authorization.created
                break;
            case 'issuing_authorization.updated':
                issuingAuthorization = event.data.object;
                // Then define and call a function to handle the event issuing_authorization.updated
                break;
            case 'issuing_card.created':
                issuingCard = event.data.object;
                // Then define and call a function to handle the event issuing_card.created
                break;
            case 'issuing_card.updated':
                issuingCard = event.data.object;
                // Then define and call a function to handle the event issuing_card.updated
                break;
            case 'issuing_cardholder.created':
                issuingCardholder = event.data.object;
                // Then define and call a function to handle the event issuing_cardholder.created
                break;
            case 'issuing_cardholder.updated':
                issuingCardholder = event.data.object;
                // Then define and call a function to handle the event issuing_cardholder.updated
                break;
            case 'issuing_dispute.closed':
                issuingDispute = event.data.object;
                // Then define and call a function to handle the event issuing_dispute.closed
                break;
            case 'issuing_dispute.created':
                issuingDispute = event.data.object;
                // Then define and call a function to handle the event issuing_dispute.created
                break;
            case 'issuing_dispute.funds_reinstated':
                issuingDispute = event.data.object;
                // Then define and call a function to handle the event issuing_dispute.funds_reinstated
                break;
            case 'issuing_dispute.submitted':
                issuingDispute = event.data.object;
                // Then define and call a function to handle the event issuing_dispute.submitted
                break;
            case 'issuing_dispute.updated':
                issuingDispute = event.data.object;
                // Then define and call a function to handle the event issuing_dispute.updated
                break;
            case 'issuing_transaction.created':
                issuingTransaction = event.data.object;
                // Then define and call a function to handle the event issuing_transaction.created
                break;
            case 'issuing_transaction.updated':
                issuingTransaction = event.data.object;
                // Then define and call a function to handle the event issuing_transaction.updated
                break;
            case 'mandate.updated':
                mandate = event.data.object;
                // Then define and call a function to handle the event mandate.updated
                break;
            case 'order.created':
                order = event.data.object;
                // Then define and call a function to handle the event order.created
                break;
            case 'order.payment_failed':
                order = event.data.object;
                // Then define and call a function to handle the event order.payment_failed
                break;
            case 'order.payment_succeeded':
                order = event.data.object;
                // Then define and call a function to handle the event order.payment_succeeded
                break;
            case 'order.updated':
                order = event.data.object;
                // Then define and call a function to handle the event order.updated
                break;
            case 'order_return.created':
                orderReturn = event.data.object;
                // Then define and call a function to handle the event order_return.created
                break;
            case 'payment_intent.amount_capturable_updated':
                paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.amount_capturable_updated
                break;
            case 'payment_intent.canceled':
                paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.canceled
                break;
            case 'payment_intent.created':
                paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.created
                break;
            case 'payment_intent.partially_funded':
                paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.partially_funded
                break;
            case 'payment_intent.payment_failed':
                paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.payment_failed
                break;
            case 'payment_intent.processing':
                paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.processing
                break;
            case 'payment_intent.requires_action':
                paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.requires_action
                break;
            case 'payment_intent.succeeded':
                paymentIntent = event.data.object;
                // Then define and call a function to handle the event payment_intent.succeeded
                break;
            case 'payment_link.created':
                paymentLink = event.data.object;
                // Then define and call a function to handle the event payment_link.created
                break;
            case 'payment_link.updated':
                paymentLink = event.data.object;
                // Then define and call a function to handle the event payment_link.updated
                break;
            case 'payment_method.attached':
                paymentMethod = event.data.object;
                // Then define and call a function to handle the event payment_method.attached
                break;
            case 'payment_method.automatically_updated':
                paymentMethod = event.data.object;
                // Then define and call a function to handle the event payment_method.automatically_updated
                break;
            case 'payment_method.detached':
                paymentMethod = event.data.object;
                // Then define and call a function to handle the event payment_method.detached
                break;
            case 'payment_method.updated':
                paymentMethod = event.data.object;
                // Then define and call a function to handle the event payment_method.updated
                break;
            case 'payout.canceled':
                payout = event.data.object;
                // Then define and call a function to handle the event payout.canceled
                break;
            case 'payout.created':
                payout = event.data.object;
                // Then define and call a function to handle the event payout.created
                break;
            case 'payout.failed':
                payout = event.data.object;
                // Then define and call a function to handle the event payout.failed
                break;
            case 'payout.paid':
                payout = event.data.object;
                // Then define and call a function to handle the event payout.paid
                break;
            case 'payout.updated':
                payout = event.data.object;
                // Then define and call a function to handle the event payout.updated
                break;
            case 'person.created':
                person = event.data.object;
                // Then define and call a function to handle the event person.created
                break;
            case 'person.deleted':
                person = event.data.object;
                // Then define and call a function to handle the event person.deleted
                break;
            case 'person.updated':
                person = event.data.object;
                // Then define and call a function to handle the event person.updated
                break;
            case 'plan.created':
                plan = event.data.object;
                // Then define and call a function to handle the event plan.created
                break;
            case 'plan.deleted':
                plan = event.data.object;
                // Then define and call a function to handle the event plan.deleted
                break;
            case 'plan.updated':
                plan = event.data.object;
                // Then define and call a function to handle the event plan.updated
                break;
            case 'price.created':
                price = event.data.object;
                // Then define and call a function to handle the event price.created
                break;
            case 'price.deleted':
                price = event.data.object;
                // Then define and call a function to handle the event price.deleted
                break;
            case 'price.updated':
                price = event.data.object;
                // Then define and call a function to handle the event price.updated
                break;
            case 'product.created':
                product = event.data.object;
                // Then define and call a function to handle the event product.created
                break;
            case 'product.deleted':
                product = event.data.object;
                // Then define and call a function to handle the event product.deleted
                break;
            case 'product.updated':
                product = event.data.object;
                // Then define and call a function to handle the event product.updated
                break;
            case 'promotion_code.created':
                promotionCode = event.data.object;
                // Then define and call a function to handle the event promotion_code.created
                break;
            case 'promotion_code.updated':
                promotionCode = event.data.object;
                // Then define and call a function to handle the event promotion_code.updated
                break;
            case 'quote.accepted':
                quote = event.data.object;
                // Then define and call a function to handle the event quote.accepted
                break;
            case 'quote.canceled':
                quote = event.data.object;
                // Then define and call a function to handle the event quote.canceled
                break;
            case 'quote.created':
                quote = event.data.object;
                // Then define and call a function to handle the event quote.created
                break;
            case 'quote.finalized':
                quote = event.data.object;
                // Then define and call a function to handle the event quote.finalized
                break;
            case 'radar.early_fraud_warning.created':
                earlyFraudWarning = event.data.object;
                // Then define and call a function to handle the event radar.early_fraud_warning.created
                break;
            case 'radar.early_fraud_warning.updated':
                earlyFraudWarning = event.data.object;
                // Then define and call a function to handle the event radar.early_fraud_warning.updated
                break;
            case 'recipient.created':
                recipient = event.data.object;
                // Then define and call a function to handle the event recipient.created
                break;
            case 'recipient.deleted':
                recipient = event.data.object;
                // Then define and call a function to handle the event recipient.deleted
                break;
            case 'recipient.updated':
                recipient = event.data.object;
                // Then define and call a function to handle the event recipient.updated
                break;
            case 'reporting.report_run.failed':
                reportRun = event.data.object;
                // Then define and call a function to handle the event reporting.report_run.failed
                break;
            case 'reporting.report_run.succeeded':
                reportRun = event.data.object;
                // Then define and call a function to handle the event reporting.report_run.succeeded
                break;
            case 'review.closed':
                review = event.data.object;
                // Then define and call a function to handle the event review.closed
                break;
            case 'review.opened':
                review = event.data.object;
                // Then define and call a function to handle the event review.opened
                break;
            case 'setup_intent.canceled':
                setupIntent = event.data.object;
                // Then define and call a function to handle the event setup_intent.canceled
                break;
            case 'setup_intent.created':
                setupIntent = event.data.object;
                // Then define and call a function to handle the event setup_intent.created
                break;
            case 'setup_intent.requires_action':
                setupIntent = event.data.object;
                // Then define and call a function to handle the event setup_intent.requires_action
                break;
            case 'setup_intent.setup_failed':
                setupIntent = event.data.object;
                // Then define and call a function to handle the event setup_intent.setup_failed
                break;
            case 'setup_intent.succeeded':
                setupIntent = event.data.object;
                // Then define and call a function to handle the event setup_intent.succeeded
                break;
            case 'sigma.scheduled_query_run.created':
                scheduledQueryRun = event.data.object;
                // Then define and call a function to handle the event sigma.scheduled_query_run.created
                break;
            case 'sku.created':
                sku = event.data.object;
                // Then define and call a function to handle the event sku.created
                break;
            case 'sku.deleted':
                sku = event.data.object;
                // Then define and call a function to handle the event sku.deleted
                break;
            case 'sku.updated':
                sku = event.data.object;
                // Then define and call a function to handle the event sku.updated
                break;
            case 'source.canceled':
                source = event.data.object;
                // Then define and call a function to handle the event source.canceled
                break;
            case 'source.chargeable':
                source = event.data.object;
                // Then define and call a function to handle the event source.chargeable
                break;
            case 'source.failed':
                source = event.data.object;
                // Then define and call a function to handle the event source.failed
                break;
            case 'source.mandate_notification':
                source = event.data.object;
                // Then define and call a function to handle the event source.mandate_notification
                break;
            case 'source.refund_attributes_required':
                source = event.data.object;
                // Then define and call a function to handle the event source.refund_attributes_required
                break;
            case 'source.transaction.created':
                transaction = event.data.object;
                // Then define and call a function to handle the event source.transaction.created
                break;
            case 'source.transaction.updated':
                transaction = event.data.object;
                // Then define and call a function to handle the event source.transaction.updated
                break;
            case 'subscription_schedule.aborted':
                subscriptionSchedule = event.data.object;
                // Then define and call a function to handle the event subscription_schedule.aborted
                break;
            case 'subscription_schedule.canceled':
                subscriptionSchedule = event.data.object;
                // Then define and call a function to handle the event subscription_schedule.canceled
                break;
            case 'subscription_schedule.completed':
                subscriptionSchedule = event.data.object;
                // Then define and call a function to handle the event subscription_schedule.completed
                break;
            case 'subscription_schedule.created':
                subscriptionSchedule = event.data.object;
                // Then define and call a function to handle the event subscription_schedule.created
                break;
            case 'subscription_schedule.expiring':
                subscriptionSchedule = event.data.object;
                // Then define and call a function to handle the event subscription_schedule.expiring
                break;
            case 'subscription_schedule.released':
                subscriptionSchedule = event.data.object;
                // Then define and call a function to handle the event subscription_schedule.released
                break;
            case 'subscription_schedule.updated':
                subscriptionSchedule = event.data.object;
                // Then define and call a function to handle the event subscription_schedule.updated
                break;
            case 'tax_rate.created':
                taxRate = event.data.object;
                // Then define and call a function to handle the event tax_rate.created
                break;
            case 'tax_rate.updated':
                taxRate = event.data.object;
                // Then define and call a function to handle the event tax_rate.updated
                break;
            case 'terminal.reader.action_failed':
                reader = event.data.object;
                // Then define and call a function to handle the event terminal.reader.action_failed
                break;
            case 'terminal.reader.action_succeeded':
                reader = event.data.object;
                // Then define and call a function to handle the event terminal.reader.action_succeeded
                break;
            case 'test_helpers.test_clock.advancing':
                testClock = event.data.object;
                // Then define and call a function to handle the event test_helpers.test_clock.advancing
                break;
            case 'test_helpers.test_clock.created':
                testClock = event.data.object;
                // Then define and call a function to handle the event test_helpers.test_clock.created
                break;
            case 'test_helpers.test_clock.deleted':
                testClock = event.data.object;
                // Then define and call a function to handle the event test_helpers.test_clock.deleted
                break;
            case 'test_helpers.test_clock.internal_failure':
                testClock = event.data.object;
                // Then define and call a function to handle the event test_helpers.test_clock.internal_failure
                break;
            case 'test_helpers.test_clock.ready':
                testClock = event.data.object;
                // Then define and call a function to handle the event test_helpers.test_clock.ready
                break;
            case 'topup.canceled':
                topup = event.data.object;
                // Then define and call a function to handle the event topup.canceled
                break;
            case 'topup.created':
                topup = event.data.object;
                // Then define and call a function to handle the event topup.created
                break;
            case 'topup.failed':
                topup = event.data.object;
                // Then define and call a function to handle the event topup.failed
                break;
            case 'topup.reversed':
                topup = event.data.object;
                // Then define and call a function to handle the event topup.reversed
                break;
            case 'topup.succeeded':
                topup = event.data.object;
                // Then define and call a function to handle the event topup.succeeded
                break;
            case 'transfer.created':
                transfer = event.data.object;
                // Then define and call a function to handle the event transfer.created
                break;
            case 'transfer.failed':
                transfer = event.data.object;
                // Then define and call a function to handle the event transfer.failed
                break;
            case 'transfer.paid':
                transfer = event.data.object;
                // Then define and call a function to handle the event transfer.paid
                break;
            case 'transfer.reversed':
                transfer = event.data.object;
                // Then define and call a function to handle the event transfer.reversed
                break;
            case 'transfer.updated':
                transfer = event.data.object;
                // Then define and call a function to handle the event transfer.updated
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event?.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        return json({ event: event?.type }, { status: 200 });
    } catch (err: any) {
        throw error(500, err);
    }
}