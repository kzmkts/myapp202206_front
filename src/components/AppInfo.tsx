import {
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiMysql,
  SiDocker,
  SiGithubactions,
  SiHeroku,
  SiVercel,
} from 'react-icons/si'

const skills = [
  {
    icon: <SiTypescript className="h-8 w-8 rounded text-[#2E71BB]" />,
    title: 'TypeScript',
  },
  {
    icon: <SiReact className="h-8 w-8 text-[#62DAFB]" />,
    title: 'React',
  },
  {
    icon: <SiTailwindcss className="h-8 w-8 text-[#37BDF8]" />,
    title: 'Tailwind CSS',
  },
  {
    icon: <SiPython className="h-8 w-8 text-[#FFE05D]" />,
    title: 'Python',
  },
  {
    icon: <SiFastapi className="h-8 w-8 text-[#11988A]" />,
    title: 'FastAPI',
  },
  {
    icon: <SiMysql className="h-8 w-8 text-[#02758F]" />,
    title: 'MySQL',
  },
  {
    icon: <SiDocker className="h-8 w-8 text-[#2396EC]" />,
    title: 'Docker',
  },
  {
    icon: <SiGithubactions className="h-8 w-8 text-[#2088FF]" />,
    title: 'GitHub Actions',
  },
  {
    icon: <SiHeroku className="h-8 w-8 text-[#634987]" />,
    title: 'Heroku',
  },
  {
    icon: <SiVercel className="h-8 w-8 text-[#000000]" />,
    title: 'Vercel',
  },
]

export const AppInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 font-['Noto_Sans_JP']">
      <h1 className="text-3xl font-black">Todo App</h1>
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-xl font-bold">作成者</h2>
        <p className="font-medium">Kitasuji Kazuma</p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-xl font-bold">利用スキル</h2>
        <ul className="grid grid-cols-2 gap-3">
          {skills.map((skill, index) => (
            <li
              className="inline-flex items-center space-x-3 rounded py-2 px-4 font-medium shadow"
              key={index}
            >
              <span>{skill.icon}</span>
              <span>{skill.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
