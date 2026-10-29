import type { Education, Profile } from "../types"

export const profile: Profile = {
  name: "Trần Thành Nhân",
  headline: "Senior Full-Stack Engineer",
  location: "Ho Chi Minh City, Vietnam",
  timezone: "UTC+7",
  experienceClaim: { label: "6.5 years of experience", asOf: "2026-07" },
  contact: {
    email: "thanhnhan.toantin@gmail.com",
    links: [
      {
        kind: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/nhantt/",
      },
      {
        kind: "website",
        label: "GitHub",
        href: "https://github.com/thanhnhan776/",
      },
    ],
  },
  resume: {
    href: "/resume/Tran-Thanh-Nhan_Resume_VN_Remote.pdf",
    label: "View résumé PDF",
  },
}

export const education: Education[] = [
  {
    id: "fpt-university",
    school: "FPT University",
    degree: "Bachelor of Software Engineering",
    dates: { start: "2016-09", end: "2019-12" },
    honors: [
      "GPA: 8.3/10",
      "Excellent student for three consecutive semesters",
    ],
  },
]
