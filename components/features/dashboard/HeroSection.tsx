// @TASK P5-S1-T1 - 메인 대시보드 환영 섹션
// @SPEC docs/planning/sqld-visual-lab-spec.md

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎓 SQLD Visual Lab
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          SQL 개념을 시각적으로 이해하고
        </p>
        <p className="text-xl text-gray-600">
          브라우저에서 바로 실습하세요
        </p>
      </div>
    </section>
  )
}
