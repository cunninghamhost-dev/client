import { Heading, Text, Section, Hr, Link } from '@react-email/components';
import EmailLayout from './components/EmailLayout';
import { emailTheme } from './theme/emailTheme';

interface IFlightBookingOtpEmailProps {
  email: string;
  otpCode: string;
  expiryMinutes: number;
  supportEmail: string;
  flightCode: string;
  bookingId: string;
  departureCity: string;
  arrivalCity: string;
  travelDate: string;
  travellersCount: number;
}

export default function OtpFlightBookingEmail({
  email,
  otpCode,
  expiryMinutes,
  supportEmail,
  flightCode,
  bookingId,
  departureCity,
  arrivalCity,
  travelDate,
  travellersCount,
}: IFlightBookingOtpEmailProps) {
  return (
    <EmailLayout
      supportEmail={supportEmail}
      logoUrl={
        'https://hamkmsacitedfbxxixte.supabase.co/storage/v1/object/public/contakt_assets/uploads/my-contakt-logo/logo.png'
      }
    >
      <Heading as='h1' style={styles.heading}>
        Verify Your Flight Booking
      </Heading>

      <Text style={styles.paragraph}>Hi,</Text>

      <Text style={styles.paragraph}>
        We received a flight booking request. Please review the details below and use the One-Time Passcode (OTP) to
        confirm your booking.
      </Text>

      <Text style={styles.paragraph}>
        We received your flight booking request for <span style={styles.strong}>{email}</span>. Please review the
        details below and use the One-Time Passcode (OTP) to confirm your booking.
      </Text>

      {/* Booking Details Card */}
      <Section style={styles.detailsCard}>
        <Text style={styles.detailsItem}>
          <strong>Flight Reference:</strong> {flightCode}
        </Text>
        <Text style={styles.detailsItem}>
          <strong>Booking Number:</strong> {bookingId}
        </Text>

        <Text style={styles.detailsItem}>
          <strong>Route:</strong> {departureCity} → {arrivalCity}
        </Text>

        <Text style={styles.detailsItem}>
          <strong>Travel Date:</strong> {travelDate}
        </Text>

        <Text style={styles.detailsItem}>
          <strong>Travellers:</strong> {travellersCount}
        </Text>
      </Section>

      {/* OTP Block */}
      <Section style={styles.otpWrapper}>
        <div style={styles.otpBox}>
          <Text style={styles.otpCode}>
            ✈️ <span style={styles.otpMono}>{otpCode}</span>
          </Text>
          <Text style={styles.otpLabel}>This code expires in {expiryMinutes} minutes</Text>
        </div>
      </Section>

      <Hr style={styles.divider} />

      <Text style={styles.smallText}>
        If you did not request this booking, please ignore this email or contact{' '}
        <Link href={`mailto:${supportEmail}`} style={styles.link}>
          {supportEmail}
        </Link>
        .
      </Text>

      <Text style={styles.securityNote}>For your security, do not share this code with anyone.</Text>
    </EmailLayout>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Styles                                  */
/* -------------------------------------------------------------------------- */

const styles = {
  heading: {
    margin: '0 0 12px 0',
    fontSize: emailTheme.typography.h1.fontSize,
    fontWeight: emailTheme.typography.h1.fontWeight,
    color: emailTheme.colors.neutral900,
  },

  paragraph: {
    margin: '0 0 16px 0',
    fontSize: emailTheme.typography.body.fontSize,
    lineHeight: emailTheme.typography.body.lineHeight,
    color: emailTheme.colors.neutralBase,
  },

  strong: {
    fontWeight: '600',
    color: emailTheme.colors.black,
  },

  detailsCard: {
    backgroundColor: emailTheme.colors.primary50,
    border: `1px solid ${emailTheme.colors.primary200}`,
    padding: '16px',
    borderRadius: '6px',
    margin: '16px 0',
  },

  detailsItem: {
    margin: '0 0 6px 0',
    fontSize: emailTheme.typography.small.fontSize,
    color: emailTheme.colors.neutral700,
  },

  otpWrapper: {
    margin: '20px 0',
    textAlign: 'center' as const,
  },

  otpBox: {
    display: 'inline-block',
    padding: '18px 22px',
    borderRadius: '8px',
    backgroundColor: emailTheme.colors.white,
    border: `2px solid ${emailTheme.colors.primary}`,
  },

  otpCode: {
    margin: '0',
    fontSize: '26px',
    letterSpacing: '4px',
    fontWeight: '700',
    color: emailTheme.colors.primary800,
  },

  otpMono: {
    fontFamily: "'Courier New', monospace",
  },

  otpLabel: {
    marginTop: '8px',
    fontSize: emailTheme.typography.small.fontSize,
    color: emailTheme.colors.neutral500,
  },

  divider: {
    border: 'none',
    borderTop: `1px solid ${emailTheme.colors.neutral50}`,
    margin: '20px 0',
  },

  smallText: {
    fontSize: emailTheme.typography.small.fontSize,
    color: emailTheme.colors.neutral500,
    margin: '0 0 8px 0',
  },

  securityNote: {
    fontSize: emailTheme.typography.small.fontSize,
    color: emailTheme.colors.neutral500,
  },

  link: {
    color: emailTheme.colors.primary,
    textDecoration: 'none',
  },
};
