package com.rentguard_backend.service;

import java.util.Locale;

import org.springframework.stereotype.Service;

import com.rentguard_backend.model.Agreement;
import com.rentguard_backend.repository.AgreementRepository;

/**
 * Simple rule-based rental assistant (no external AI service needed).
 * Replace {@link #reply} with a call to an LLM provider if you want free-form answers.
 */
@Service
public class AiAssistantService {

    private static final String DISCLAIMER =
            " (General guidance only, not legal advice. Check your agreement and local tenancy law.)";

    private final AgreementRepository agreementRepository;

    public AiAssistantService(AgreementRepository agreementRepository) {
        this.agreementRepository = agreementRepository;
    }

    public String reply(String ownerId, String message) {
        String m = message.toLowerCase(Locale.ROOT);
        Agreement a = agreementRepository.findByOwnerId(ownerId).orElse(null);

        if (has(m, "deposit", "refund")) {
            String amount = a != null && a.getSecurityDeposit() != null
                    ? " Your agreement lists a deposit of ₹" + a.getSecurityDeposit().toPlainString() + "." : "";
            return "To protect your deposit, upload dated move-in and move-out photos in the Evidence Vault and "
                    + "keep rent receipts. Ask the landlord for a written list of any deductions." + amount + DISCLAIMER;
        }
        if (has(m, "notice", "vacate", "move out", "leave", "terminate")) {
            String period = a != null && a.getNoticePeriod() != null
                    ? " Your agreement states a notice period of " + a.getNoticePeriod() + "." : "";
            return "Give notice in writing and keep a copy or proof of delivery." + period
                    + " Take photos of the property condition before handing over the keys." + DISCLAIMER;
        }
        if (has(m, "evict", "kick out", "lock")) {
            return "A landlord generally cannot evict you or change locks without following the legal process "
                    + "and notice in your agreement. Document everything and consider contacting a local tenant "
                    + "helpline or lawyer." + DISCLAIMER;
        }
        if (has(m, "rent", "pay", "receipt")) {
            return "Record every rent payment in the Payments page and ask for a receipt or pay by bank transfer "
                    + "so there is a trail. If you dispute an increase, check the rent clause in your agreement."
                    + DISCLAIMER;
        }
        if (has(m, "leak", "water", "pipe", "damp", "seep")) {
            return "Water problems can get worse quickly. Take dated photos or video, file a complaint with HIGH "
                    + "priority in RentGuard so the landlord is on record as notified, and follow up in writing."
                    + DISCLAIMER;
        }
        if (has(m, "electric", "power", "wire", "spark", "short circuit")) {
            return "Electrical faults can be dangerous: switch off the affected circuit, avoid touching exposed "
                    + "wires, and report it as EMERGENCY priority with photos." + DISCLAIMER;
        }
        if (has(m, "pest", "rat", "cockroach", "termite", "bug")) {
            return "Document the infestation with photos, report it under the Pest category, and ask the landlord "
                    + "for pest control in writing. Check who is responsible for maintenance in your agreement.";
        }
        if (has(m, "repair", "broken", "fix", "maintenance")) {
            String who = a != null && a.getMaintenanceResponsibility() != null
                    ? " Your agreement says maintenance is: " + a.getMaintenanceResponsibility() + "." : "";
            return "Report it on the Report Problem page with photos so there is a dated record, then track "
                    + "progress on the Repairs page." + who;
        }
        if (has(m, "agreement", "contract", "lease", "clause")) {
            return a != null
                    ? "Your saved agreement: rent ₹" + a.getMonthlyRent().toPlainString() + ", deposit ₹"
                            + a.getSecurityDeposit().toPlainString()
                            + (a.getNoticePeriod() != null ? ", notice period " + a.getNoticePeriod() : "")
                            + ". Open the Agreement page for the full summary."
                    : "Save your agreement details on the Agreement page and I can refer to them in my answers.";
        }
        return "I can help with repairs, rent, deposits, notice periods and your agreement. "
                + "Tell me what is happening, for example \"my bathroom pipe is leaking\" or "
                + "\"how do I get my deposit back?\".";
    }

    private boolean has(String text, String... words) {
        for (String w : words) {
            if (text.contains(w)) return true;
        }
        return false;
    }
}
