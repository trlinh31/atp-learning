import { uploadFile } from "@/lib/api";

export interface InternApplicationData {
  job_id: number;
  introduction?: string;
  positions: string[];
  other_position?: string;
  preferred_location: string;
  start_date: string;
  internship_type: string;
  has_cv: "yes" | "no";
  cv_file?: File;
  educations?: Array<{
    school: string;
    major: string;
    year: string;
  }>;
  country?: string;
  state?: string;
  city?: string;
  experience_description?: string;
  whatsapp: string;
  social_media_platform?: string;
  social_media_link?: string;
  what_to_gain?: string;
  how_did_you_hear: string;
}

export async function submitInternApplication(formData: FormData): Promise<any> {
  return uploadFile("/api/community/intern/register", formData);
}

