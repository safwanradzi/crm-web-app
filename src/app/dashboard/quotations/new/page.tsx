
import { QuotationForm } from '../quotation-form'
import { getClients } from '../../clients/actions'
import { getProjects } from '../../projects/actions'
import { generateQuoteNumber } from '../actions'

export default async function NewQuotationPage() {
    const clients = await getClients()
    const projects = await getProjects()
    const nextQuoteNumber = await generateQuoteNumber()

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">New Quotation</h1>
                <p className="text-muted-foreground">
                    Create a bespoke quotation for your client.
                </p>
            </div>
            <QuotationForm
                clients={clients}
                projects={projects}
                nextQuoteNumber={nextQuoteNumber}
            />
        </div>
    )
}
