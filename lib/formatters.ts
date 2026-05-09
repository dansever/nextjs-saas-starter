// ─────────────────────────────────────────────
// formatters.ts
// Utility functions for formatting dates, numbers,
// currencies, strings, and more.
// ─────────────────────────────────────────────

// ── DATE ─────────────────────────────────────

/**
 * Formats a date string into a human-readable date.
 * @param dateStr - A date string (e.g. "2025-03-07 00:00:00")
 * @param options - Intl.DateTimeFormatOptions to customize output
 * @returns Formatted date string (default: "07 Mar 2025")
* @example formatDate("2025-03-07") → "07 Mar 2025"
 * @example formatDate("2025-03-07", { month: "short", day: "2-digit" }) → "07 Mar"
 * @example formatDate("2025-03-07", { month: "long", day: "numeric" }) → "7 March"
 * @example formatDate("2025-03-07", { month: "short", year: "numeric" }) → "Mar 2025"
 * @example formatDate("2025-03-07", { month: "2-digit", year: "numeric" }) → "03/2025"
 * @example formatDate("2025-03-07", { weekday: "short", day: "2-digit", month: "short" }) → "Fri, 07 Mar"
 * @example formatDate("2025-03-07", { year: "numeric" }) → "2025"
 */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
    return new Date(dateStr).toLocaleDateString("en-IL", options ?? {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

/**
 * Returns a relative time string (e.g. "3 days ago", "just now").
 * @param dateStr - A date string
 */
export function formatRelativeTime(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (seconds < 60) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 30) return `${days}d ago`
    if (months < 12) return `${months}mo ago`
    return `${years}y ago`
}


// ── CURRENCY & NUMBERS ────────────────────────

/**
 * Formats a number as currency.
 * @param amount - Numeric amount
 * @param currency - ISO 4217 currency code (default: "USD")
 * @returns Formatted currency string (e.g. "$1,234.50")
 * @example formatCurrency(1234.5) → "$1,234.50"
 * @example formatCurrency(99.9, "ILS") → "₪99.90"
 */
export function formatCurrency(amount: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-IL", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}

/**
 * Formats a number with thousand separators.
 * @param value - Numeric value
 * @param decimals - Number of decimal places (default: 2)
 * @example formatNumber(1234567.5) → "1,234,567.50"
 */
export function formatNumber(value: number, decimals = 2): string {
    return new Intl.NumberFormat("en-IL", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value)
}

/**
 * Formats a decimal as a percentage.
 * @param value - Decimal value (e.g. 0.123 for 12.3%)
 * @param decimals - Number of decimal places (default: 1)
 * @example formatPercent(0.123) → "12.3%"
 */
export function formatPercent(value: number, decimals = 1): string {
    return new Intl.NumberFormat("en-IL", {
        style: "percent",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value)
}

/**
 * Formats a large number with K/M/B suffixes.
 * @example formatCompact(1234567) → "1.2M"
 */
export function formatCompact(value: number): string {
    return new Intl.NumberFormat("en-IL", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value)
}


// ── FILE SIZE ─────────────────────────────────

/**
 * Formats a byte count into a human-readable file size.
 * @example formatFileSize(1024) → "1.0 KB"
 */
export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}


// ── STRINGS ───────────────────────────────────

/**
 * Truncates a string with an ellipsis.
 * @param str - Input string
 * @param maxLength - Max character length (default: 20)
 * @example truncate("Very long merchant name", 12) → "Very long m…"
 */
export function truncate(str: string, maxLength = 20): string {
    return str.length > maxLength ? str.slice(0, maxLength).trimEnd() + "…" : str
}

/**
 * Converts a string to Title Case.
 * @example toTitleCase("hello world") → "Hello World"
 */
export function toTitleCase(str: string): string {
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Converts a camelCase or snake_case string to a readable label.
 * @example toLabel("bankCategory") → "Bank Category"
 * @example toLabel("bank_category") → "Bank Category"
 */
export function toLabel(str: string): string {
    return toTitleCase(str.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2"))
}

/**
 * Returns initials from a name string (up to 2 characters).
 * @example getInitials("Dan Sever") → "DS"
 * @example getInitials("Anthropic") → "AN"
 */
export function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Masks sensitive strings (e.g. card numbers, IDs).
 * @example maskString("1234567890") → "••••••7890"
 */
export function maskString(str: string, visibleChars = 4, maskChar = "•"): string {
    if (str.length <= visibleChars) return str
    return maskChar.repeat(str.length - visibleChars) + str.slice(-visibleChars)
}