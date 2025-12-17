import { getClients } from '../../clients/actions'
import { getProjects } from '../../projects/actions'
import { InvoiceForm } from '../invoice-form'
import { generateInvoiceNumber } from '../actions'

export default async function NewInvoicePage() {
    const { data: clients } = await getClients(1, 1000)
    const { data: projects } = await getProjects(1, 1000)
    const nextInvoiceNumber = await generateInvoiceNumber()

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">New Invoice</h1>
            <InvoiceForm
                clients={clients}
                projects={projects}
                nextInvoiceNumber={nextInvoiceNumber}
            />
        </div>
    )
}
