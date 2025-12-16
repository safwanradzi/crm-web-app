
import { getQuotationById } from '../actions'
import { notFound } from 'next/navigation'
import { QuotationPrintView } from './quotation-print-view'

// Force dynamic rendering so user always sees fresh data
export const dynamic = 'force-dynamic'

export default async function QuotationDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const quotation = await getQuotationById(params.id)

    if (!quotation) return notFound()

    return <QuotationPrintView quotation={quotation} />
}
