export type FieldErrors = Record<string, string>;

export type AttachmentDraft = {
  hasAttachments: boolean;
  attachments: Array<{
    id?: number;
    type?: string;
    transmissionCode?: string;
    code?: string;
    controlNumber?: string;
    control?: string;
    supplement?: string;
  }>;
};

function isBlank(v: unknown): boolean {
  return v === undefined || v === null || String(v).trim() === '';
}

/** Main Provider Portal flow (PARequestForm + PascalCase tab fields) */
export function validateSpaHeader(fd: Record<string, unknown>): {
  ok: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  if (!String(fd.recipientLastName || '').trim()) {
    errors.recipient =
      'Recipient ID is required. Enter a valid ID and click Confirm to load recipient details.';
  }

  if (!fd.billingProviderSame) {
    if (!String(fd.billingNpi || '').trim()) {
      errors.billingNpi = 'NPI is required. Enter NPI and click Validate.';
    }
    if (!String(fd.billingLastNameOrg || '').trim()) {
      errors.billing =
        'Billing provider is required. Use test NPI 1982362018 and click Validate to load provider data.';
    }
    if (String(fd.billingLastNameOrg || '').trim() && !String(fd.billingTaxonomyCode || '').trim()) {
      errors.billingTaxonomy = 'Select a Taxonomy Code for the billing provider.';
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function validateSpaDetail(fd: Record<string, unknown>): {
  ok: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  if (!String(fd.group || '').trim()) {
    errors.group = 'Group is required.';
  }
  if (!String(fd.npi || '').trim()) {
    errors.npi = 'NPI / Atypical ID is required.';
  }
  if (!String(fd.locatorCode || '').trim()) {
    errors.locatorCode = 'Locator Code is required.';
  }
  if (!String(fd.taxonomyCode || '').trim()) {
    errors.detailTaxonomy = 'Taxonomy Code is required in Base Information.';
  }

  const items = (fd.lineItems as Record<string, unknown>[]) || [];
  if (!items.length) {
    errors.lineItems = 'Add at least one line item.';
  }

  items.forEach((item, i) => {
    const row = i + 1;
    if (!String(item.procCode || '').trim()) {
      errors[`line_${i}_procCode`] = `Line ${row}: Procedure code is required.`;
    }
    const area = String(item.areaOfCavity || '');
    if (!area || area === 'Choose') {
      errors[`line_${i}_area`] = `Line ${row}: Area of Cavity is required.`;
    }
    const tooth = String(item.tooth || '');
    if (!tooth || tooth === 'Choose') {
      errors[`line_${i}_tooth`] = `Line ${row}: Tooth selection is required.`;
    }
    if (!String(item.requestedBeginDate || '').trim()) {
      errors[`line_${i}_date`] = `Line ${row}: Requested begin date is required.`;
    }
  });

  return { ok: Object.keys(errors).length === 0, errors };
}

export function validateSpaAttachments(
  fd: Record<string, unknown>,
  draft?: AttachmentDraft | null
): { ok: boolean; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const hasAttachments =
    draft !== undefined && draft !== null ? draft.hasAttachments : Boolean(fd.hasAttachments);
  const attachments =
    draft !== undefined && draft !== null
      ? draft.attachments
      : ((fd.attachments as AttachmentDraft['attachments']) || []);

  if (hasAttachments) {
    if (!attachments.length) {
      errors.attachments =
        'Add at least one attachment row, or select No for attachments question.';
    }
    attachments.forEach((a, i) => {
      const row = i + 1;
      const type = String(a.type || '').trim();
      const tx = String(a.transmissionCode || a.code || '').trim();
      const ctrl = String(a.controlNumber ?? a.control ?? '').trim();
      const sup = String(a.supplement || '').trim();
      if (!type) errors[`attachment_${i}_type`] = `Attachment ${row}: type is required.`;
      if (!tx) errors[`attachment_${i}_tx`] = `Attachment ${row}: transmission code is required.`;
      if (!ctrl)
        errors[`attachment_${i}_control`] = `Attachment ${row}: control number is required.`;
      if (!sup)
        errors[`attachment_${i}_supplement`] =
          `Attachment ${row}: upload a file or enter a document name.`;
    });
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

/** /pa-form route (snake-ish FormData in pa-form-tabs) */
export function validateRouteHeader(fd: Record<string, unknown>): {
  ok: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  if (!String(fd.recipientLastName || '').trim()) {
    errors.recipient =
      'Recipient ID is required. Enter an ID and click Confirm to load recipient details.';
  }

  if (!fd.billingProviderSame) {
    if (!String(fd.billingNpi || '').trim()) {
      errors.billingNpi = 'NPI is required.';
    }
    if (!String(fd.billingLastName || '').trim()) {
      errors.billing =
        'Validate billing provider: enter NPI 1982362018 and click Validate.';
    }
    if (String(fd.billingLastName || '').trim() && !String(fd.billingTaxonomyCode || '').trim()) {
      errors.billingTaxonomy = 'Taxonomy Code must be present after validation.';
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function validateRouteDetail(fd: Record<string, unknown>): {
  ok: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  const account = String(fd.accountInfo ?? '').toLowerCase();
  if (account !== 'long' && account !== 'short') {
    errors.accountInfo = 'Account Information is required.';
  }
  if (isBlank(fd.npiAtypicalId)) {
    errors.npiAtypicalId = 'NPI / Atypical ID is required.';
  }
  if (isBlank(fd.group)) {
    errors.group = 'Group is required.';
  }
  if (isBlank(fd.taxonomyCode)) {
    errors.taxonomyCode = 'Taxonomy Code is required.';
  }
  if (isBlank(fd.locatorCode)) {
    errors.locatorCode = 'Locator Code is required.';
  }

  const items = (fd.lineItems as Record<string, unknown>[]) || [];
  if (!items.length) {
    errors.lineItems = 'Add at least one line item.';
  }

  items.forEach((item, i) => {
    const row = i + 1;
    if (!String(item.procCode || '').trim()) {
      errors[`line_${i}_procCode`] = `Line ${row}: Procedure code is required.`;
    }
    const area = String(item.areaCavity || '');
    if (!area || area === 'Choose') {
      errors[`line_${i}_area`] = `Line ${row}: Area of Cavity is required.`;
    }
    const tooth = String(item.tooth || '');
    if (!tooth || tooth === 'Choose') {
      errors[`line_${i}_tooth`] = `Line ${row}: Tooth is required.`;
    }
    if (!String(item.requestDate || '').trim()) {
      errors[`line_${i}_date`] = `Line ${row}: Requested begin date is required.`;
    }
  });

  return { ok: Object.keys(errors).length === 0, errors };
}

export function validateRouteAttachments(fd: Record<string, unknown>): {
  ok: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};
  const hasAttachments = Boolean(fd.hasAttachments);
  const attachments =
    (fd.attachments as Array<Record<string, unknown>>) || [];

  if (hasAttachments) {
    if (!attachments.length) {
      errors.attachments =
        'Add at least one attachment or select No for the attachments question.';
    }
    attachments.forEach((a, i) => {
      const row = i + 1;
      if (isBlank(a.type)) errors[`attachment_${i}_type`] = `Row ${row}: attachment type is required.`;
      if (isBlank(a.code)) errors[`attachment_${i}_code`] = `Row ${row}: transmission code is required.`;
      if (isBlank(a.control)) errors[`attachment_${i}_control`] = `Row ${row}: control # is required.`;
      if (isBlank(a.supplement))
        errors[`attachment_${i}_supplement`] = `Row ${row}: upload a file or enter supplement text.`;
    });
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function summarizeErrors(errors: FieldErrors): string[] {
  const seen = new Set<string>();
  const list: string[] = [];
  for (const msg of Object.values(errors)) {
    if (!seen.has(msg)) {
      seen.add(msg);
      list.push(msg);
    }
  }
  return list;
}
