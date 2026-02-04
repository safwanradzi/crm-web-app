
import { QuotationForm } from '../../quotation-form'
import { getClients } from '../../../clients/actions'
import { getProjects } from '../../../projects/actions'
import { getQuotationById } from '../../actions'
import { notFound } from 'next/navigation'

export default async function EditQuotationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const quotation = await getQuotationById(id)

    if (!quotation) {
        notFound()
    }

    const { data: clients } = await getClients(1, 1000)
    const { data: projects } = await getProjects(1, 1000)

    // Ensure items are mapped correctly if structure differs, but typically getQuotationById returns items array
    // The QuotationForm expects initialData to have items, scope_of_work, payment_terms etc.
    // getQuotationById returns { ...quotation, items: items || [], profile }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Edit Quotation</h1>
                <p className="text-muted-foreground">
                    Update quotation details.
                </p>
            </div>
            <QuotationForm
                clients={clients}
                projects={projects}
                nextQuoteNumber={quotation.quote_number} // Fallback or Keep existing
                initialData={quotation}
            />
        </div>
    )
}
