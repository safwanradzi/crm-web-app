
export type Client = {
    id: string
    owner_id: string
    name: string
    company_name: string | null
    email: string | null
    phone: string | null
    address: string | null
    status: 'active' | 'inactive' | 'prospect'
    notes: string | null
    created_at: string
}

export type Project = {
    id: string
    owner_id: string
    client_id: string
    name: string
    url: string | null
    stack: string | null
    package_type: string | null
    status: 'lead' | 'in_progress' | 'on_hold' | 'completed' | 'maintenance'
    base_price: number | null
    start_date: string | null
    launch_date: string | null
    created_at: string
}

export type DomainHosting = {
    id: string
    owner_id: string
    project_id: string
    domain_name: string | null
    domain_registrar: string | null
    domain_purchase_date: string | null
    domain_expiry_date: string | null
    domain_cost: number | null
    hosting_provider: string | null
    hosting_plan: string | null
    hosting_purchase_date: string | null
    hosting_expiry_date: string | null
    hosting_cost: number | null
    login_note: string | null
    created_at: string
}

export type Invoice = {
    id: string
    owner_id: string
    client_id: string
    project_id: string | null
    invoice_number: string
    date: string
    due_date: string | null
    status: 'draft' | 'sent' | 'partially_paid' | 'paid' | 'overdue'
    subtotal: number
    discount: number
    tax: number
    total: number
    notes: string | null
    created_at: string
    clients?: { name: string }
    items?: InvoiceItem[]
    payments?: Payment[]
}

export type InvoiceItem = {
    id?: string
    invoice_id?: string
    description: string
    qty: number
    unit_price: number
    line_total: number
}

export type Payment = {
    id: string
    invoice_id: string
    payment_date: string
    amount: number
    method: string | null
    note: string | null
    receipt_path: string | null
    created_at: string
}

export type Expense = {
    id: string
    owner_id: string
    category: 'hosting_server' | 'domain_purchase' | 'plugin_license' | 'software_subscription' | 'marketing' | 'office' | 'other'
    description: string
    amount: number
    date: string
    project_id: string | null
    is_recurring: boolean
    recurring_interval: 'monthly' | 'yearly' | null
    created_at: string
    projects?: { name: string }
}

export type Addon = {
    id: string
    owner_id: string
    project_id: string | null
    description: string
    price: number
    date: string
    note: string | null
    created_at: string
    projects?: { name: string }
}
