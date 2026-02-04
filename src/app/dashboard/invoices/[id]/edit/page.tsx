
import { InvoiceForm } from '../../invoice-form'
import { getClients } from '../../../clients/actions'
import { getProjects } from '../../../projects/actions'
import { getInvoiceById } from '../../actions'
import { notFound } from 'next/navigation'

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const invoice = await getInvoiceById(id)

    if (!invoice) {
        notFound()
    }

    const { data: clients } = await getClients(1, 1000)
    const { data: projects } = await getProjects(1, 1000)

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Edit Invoice</h1>
                <p className="text-muted-foreground">
                    Update invoice details.
                </p>
            </div>
            <InvoiceForm
                clients={clients}
                projects={projects}
                // nextInvoiceNumber is not needed for edit, or we can pass existing
                initialData={invoice}
            />
        </div>
    )
}
