# 샤오미코리아 커뮤니티 웹사이트 UI/UX 명세서 (XML)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ui_ux_specification>
  <project>
    <name>샤오미코리아 커뮤니티 웹사이트</name>
    <version>1.0</version>
    <date>2026-02-01</date>
    <purpose>
      <item>샤오미코리아 회원들을 위한 사진 중심 커뮤니티 웹사이트 구축</item>
      <item>레퍼런스: Leica Club (http://www.leicaclub.net/)</item>
      <item>기본 디자인 위주, 커스터마이징 최소화</item>
    </purpose>
    <core_values>
      <value name="간결성">불필요한 장식 제거, 콘텐츠 중심</value>
      <value name="접근성">모든 사용자가 쉽게 이용 가능</value>
      <value name="확장성">향후 기능 추가 용이한 구조</value>
    </core_values>
  </project>

  <platform_solution>
    <recommended>
      <name>WordPress 6.x</name>
      <rating>5</rating>
      <theme>Astra / GeneratePress</theme>
      <reasons>
        <reason>비용 효율성: 오픈소스, 무료 테마/플러그인 다수</reason>
        <reason>커뮤니티 기능 강화: BuddyPress, bbPress 활용</reason>
        <reason>갤러리 최적화: NextGEN Gallery, Envira Gallery</reason>
        <reason>관리 편의성: 직관적인 관리자 대시보드</reason>
        <reason>유지보수: 국내 개발자 풀 넓음, 하자보수 용이</reason>
      </reasons>
      <plugins>
        <plugin type="gallery">NextGEN Gallery / Envira Gallery</plugin>
        <plugin type="community">bbPress (포럼) + BuddyPress (회원)</plugin>
        <plugin type="seo">Yoast SEO</plugin>
        <plugin type="security">Wordfence Security</plugin>
        <plugin type="performance">WP Rocket / W3 Total Cache</plugin>
        <plugin type="comments">wpDiscuz</plugin>
      </plugins>
    </recommended>
    <alternatives>
      <platform name="아임웹" rating="3" pros="드래그앤드롭 편리" cons="커스터마이징 제한적"/>
      <platform name="고도몰" rating="2" pros="이커머스 특화" cons="커뮤니티 기능 부족"/>
      <platform name="커스텀개발" rating="3" pros="완전 맞춤형" cons="비용/시간 多"/>
    </alternatives>
  </platform_solution>

  <design_system>
    <colors>
      <primary>
        <color shade="900" hex="#FF6900" usage="샤오미 오렌지 - 메인"/>
        <color shade="800" hex="#FF7A1A" usage=""/>
        <color shade="700" hex="#FF8B33" usage="호버 상태"/>
        <color shade="600" hex="#FF9C4D" usage=""/>
        <color shade="500" hex="#FFAD66" usage=""/>
        <color shade="400" hex="#FFBE80" usage=""/>
        <color shade="300" hex="#FFCF99" usage=""/>
        <color shade="200" hex="#FFE0B3" usage=""/>
        <color shade="100" hex="#FFF0CC" usage="배경 강조"/>
      </primary>
      <neutral>
        <color shade="900" hex="#0F172A" usage="제목, 본문 텍스트"/>
        <color shade="800" hex="#1E293B" usage=""/>
        <color shade="700" hex="#334155" usage="보조 텍스트"/>
        <color shade="600" hex="#475569" usage="비활성 텍스트"/>
        <color shade="500" hex="#64748B" usage=""/>
        <color shade="400" hex="#94A3B8" usage=""/>
        <color shade="300" hex="#CBD5E1" usage="구분선"/>
        <color shade="200" hex="#E2E8F0" usage="카드 배경"/>
        <color shade="100" hex="#F1F5F9" usage="페이지 배경"/>
        <color shade="50" hex="#F8FAFC" usage=""/>
      </neutral>
      <semantic>
        <color type="success" hex="#10B981" usage="성공, 좋아요"/>
        <color type="error" hex="#EF4444" usage="오류, 삭제"/>
        <color type="warning" hex="#F59E0B" usage="경고"/>
        <color type="info" hex="#3B82F6" usage="정보, 링크"/>
      </semantic>
    </colors>

    <typography>
      <fonts>
        <font type="primary" name="Pretendard" source="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" usage="한글 - 가독성, 현대적"/>
        <font type="secondary" name="Inter" source="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" usage="영문/숫자 - 깔끔, 범용"/>
      </fonts>
      <scale device="desktop">
        <size name="xs" rem="0.75" px="12" usage="캡션, 부가 정보"/>
        <size name="sm" rem="0.875" px="14" usage="메타 정보, 날짜"/>
        <size name="base" rem="1" px="16" usage="본문"/>
        <size name="lg" rem="1.125" px="18" usage="강조 본문"/>
        <size name="xl" rem="1.25" px="20" usage="서브 타이틀"/>
        <size name="2xl" rem="1.5" px="24" usage="카드 제목"/>
        <size name="3xl" rem="1.875" px="30" usage="섹션 제목"/>
        <size name="4xl" rem="2.25" px="36" usage="페이지 제목"/>
      </scale>
      <scale device="mobile">
        <size name="xs" rem="0.75" px="12"/>
        <size name="sm" rem="0.8125" px="13"/>
        <size name="base" rem="0.9375" px="15"/>
        <size name="lg" rem="1" px="16"/>
        <size name="xl" rem="1.125" px="18"/>
        <size name="2xl" rem="1.25" px="20"/>
        <size name="3xl" rem="1.5" px="24"/>
        <size name="4xl" rem="1.875" px="30"/>
      </scale>
      <weights>
        <weight name="normal" value="400"/>
        <weight name="medium" value="500"/>
        <weight name="semibold" value="600"/>
        <weight name="bold" value="700"/>
      </weights>
      <line_heights>
        <height name="tight" value="1.25" usage="제목용"/>
        <height name="normal" value="1.5" usage="본문용 (기본)"/>
        <height name="relaxed" value="1.75" usage="긴 글"/>
      </line_heights>
    </typography>

    <spacing>
      <space name="1" rem="0.25" px="4"/>
      <space name="2" rem="0.5" px="8"/>
      <space name="3" rem="0.75" px="12"/>
      <space name="4" rem="1" px="16"/>
      <space name="5" rem="1.25" px="20"/>
      <space name="6" rem="1.5" px="24"/>
      <space name="8" rem="2" px="32"/>
      <space name="10" rem="2.5" px="40"/>
      <space name="12" rem="3" px="48"/>
      <space name="16" rem="4" px="64"/>
      <space name="20" rem="5" px="80"/>
    </spacing>

    <grid_system>
      <container>
        <max_width>1200px</max_width>
        <padding breakpoint="base">var(--space-4)</padding>
        <padding breakpoint="768px">var(--space-6)</padding>
        <padding breakpoint="1024px">var(--space-8)</padding>
      </container>
      <gallery_grid>
        <columns device="desktop">repeat(auto-fill, minmax(280px, 1fr))</columns>
        <columns device="mobile">repeat(2, 1fr)</columns>
        <gap device="desktop">var(--space-6)</gap>
        <gap device="mobile">var(--space-4)</gap>
      </gallery_grid>
    </grid_system>

    <shadows>
      <shadow name="sm" value="0 1px 2px 0 rgba(0, 0, 0, 0.05)"/>
      <shadow name="md" value="0 4px 6px -1px rgba(0, 0, 0, 0.1)"/>
      <shadow name="lg" value="0 10px 15px -3px rgba(0, 0, 0, 0.1)"/>
      <shadow name="xl" value="0 20px 25px -5px rgba(0, 0, 0, 0.1)"/>
      <shadow name="hover" value="0 12px 20px -5px rgba(255, 105, 0, 0.25)" usage="오렌지 글로우"/>
    </shadows>

    <border_radius>
      <radius name="sm" value="4px" usage="작은 버튼, 태그"/>
      <radius name="md" value="8px" usage="기본 카드, 입력창"/>
      <radius name="lg" value="12px" usage="큰 카드, 모달"/>
      <radius name="xl" value="16px" usage="갤러리 이미지"/>
      <radius name="full" value="9999px" usage="원형 아바타, 뱃지"/>
    </border_radius>

    <transitions>
      <transition name="fast" value="150ms ease-in-out"/>
      <transition name="base" value="200ms ease-in-out"/>
      <transition name="slow" value="300ms ease-in-out"/>
    </transitions>
  </design_system>

  <components>
    <button name="btn-primary">
      <style property="background">var(--primary-900)</style>
      <style property="color">white</style>
      <style property="font-size">var(--text-base)</style>
      <style property="font-weight">var(--font-semibold)</style>
      <style property="padding">12px 24px</style>
      <style property="border-radius">var(--radius-md)</style>
      <style property="border">none</style>
      <style property="cursor">pointer</style>
      <style property="transition">all var(--transition-base)</style>
      <style property="box-shadow">var(--shadow-sm)</style>
      <states>
        <state name="hover">
          <style property="background">var(--primary-700)</style>
          <style property="box-shadow">var(--shadow-hover)</style>
          <style property="transform">translateY(-1px)</style>
        </state>
        <state name="active">
          <style property="transform">translateY(0)</style>
          <style property="box-shadow">var(--shadow-sm)</style>
        </state>
        <state name="disabled">
          <style property="background">var(--gray-300)</style>
          <style property="cursor">not-allowed</style>
          <style property="box-shadow">none</style>
        </state>
      </states>
      <variants>
        <variant name="sm" padding="8px 16px" font-size="var(--text-sm)"/>
        <variant name="lg" padding="16px 32px" font-size="var(--text-lg)"/>
      </variants>
    </button>

    <button name="btn-secondary">
      <style property="background">white</style>
      <style property="color">var(--primary-900)</style>
      <style property="border">2px solid var(--primary-900)</style>
      <states>
        <state name="hover">
          <style property="background">var(--primary-100)</style>
          <style property="border-color">var(--primary-700)</style>
        </state>
      </states>
    </button>

    <button name="btn-ghost">
      <style property="background">transparent</style>
      <style property="color">var(--gray-700)</style>
      <style property="border">1px solid var(--gray-300)</style>
      <states>
        <state name="hover">
          <style property="background">var(--gray-100)</style>
          <style property="border-color">var(--gray-400)</style>
        </state>
      </states>
    </button>

    <input name="input-text">
      <style property="width">100%</style>
      <style property="font-size">var(--text-base)</style>
      <style property="font-family">var(--font-primary)</style>
      <style property="padding">12px 16px</style>
      <style property="border">1px solid var(--gray-300)</style>
      <style property="border-radius">var(--radius-md)</style>
      <style property="background">white</style>
      <style property="transition">all var(--transition-base)</style>
      <states>
        <state name="focus">
          <style property="outline">none</style>
          <style property="border-color">var(--primary-900)</style>
          <style property="box-shadow">0 0 0 3px rgba(255, 105, 0, 0.1)</style>
        </state>
        <state name="placeholder">
          <style property="color">var(--gray-400)</style>
        </state>
        <state name="disabled">
          <style property="background">var(--gray-100)</style>
          <style property="cursor">not-allowed</style>
        </state>
        <state name="error">
          <style property="border-color">var(--error)</style>
          <style property="box-shadow">0 0 0 3px rgba(239, 68, 68, 0.1)</style>
        </state>
      </states>
    </input>

    <label name="input-label">
      <style property="display">block</style>
      <style property="font-size">var(--text-sm)</style>
      <style property="font-weight">var(--font-medium)</style>
      <style property="color">var(--gray-700)</style>
      <style property="margin-bottom">var(--space-2)</style>
      <modifier name="required">
        <style property="content">' *'</style>
        <style property="color">var(--error)</style>
      </modifier>
    </label>

    <textarea name="textarea">
      <extends>input-text</extends>
      <style property="min-height">120px</style>
      <style property="resize">vertical</style>
      <style property="line-height">var(--leading-normal)</style>
    </textarea>

    <card name="card">
      <style property="background">white</style>
      <style property="border-radius">var(--radius-lg)</style>
      <style property="box-shadow">var(--shadow-md)</style>
      <style property="overflow">hidden</style>
      <style property="transition">all var(--transition-base)</style>
      <states>
        <state name="hover">
          <style property="box-shadow">var(--shadow-lg)</style>
          <style property="transform">translateY(-2px)</style>
        </state>
      </states>
    </card>

    <card name="gallery-card">
      <style property="background">white</style>
      <style property="border-radius">var(--radius-xl)</style>
      <style property="overflow">hidden</style>
      <style property="box-shadow">var(--shadow-md)</style>
      <style property="cursor">pointer</style>
      <style property="transition">all var(--transition-base)</style>
      <states>
        <state name="hover">
          <style property="box-shadow">var(--shadow-hover)</style>
          <style property="transform">scale(1.02)</style>
        </state>
      </states>
      <children>
        <element name="gallery-card__image">
          <style property="width">100%</style>
          <style property="aspect-ratio">4 / 3</style>
          <style property="object-fit">cover</style>
          <style property="display">block</style>
        </element>
        <element name="gallery-card__content">
          <style property="padding">var(--space-4)</style>
        </element>
        <element name="gallery-card__title">
          <style property="font-size">var(--text-lg)</style>
          <style property="font-weight">var(--font-semibold)</style>
          <style property="color">var(--gray-900)</style>
          <style property="margin-bottom">var(--space-2)</style>
          <style property="line-height">var(--leading-tight)</style>
          <style property="display">-webkit-box</style>
          <style property="-webkit-line-clamp">2</style>
          <style property="-webkit-box-orient">vertical</style>
          <style property="overflow">hidden</style>
        </element>
        <element name="gallery-card__meta">
          <style property="display">flex</style>
          <style property="align-items">center</style>
          <style property="gap">var(--space-4)</style>
          <style property="font-size">var(--text-sm)</style>
          <style property="color">var(--gray-600)</style>
        </element>
      </children>
    </card>

    <card name="notice-card">
      <style property="background">white</style>
      <style property="border-radius">var(--radius-md)</style>
      <style property="border-left">4px solid var(--primary-900)</style>
      <style property="padding">var(--space-5)</style>
      <style property="margin-bottom">var(--space-4)</style>
      <style property="transition">all var(--transition-base)</style>
      <states>
        <state name="hover">
          <style property="box-shadow">var(--shadow-md)</style>
          <style property="background">var(--gray-50)</style>
        </state>
      </states>
      <children>
        <element name="notice-card__badge">
          <style property="background">var(--primary-900)</style>
          <style property="color">white</style>
          <style property="font-size">var(--text-xs)</style>
          <style property="font-weight">var(--font-semibold)</style>
          <style property="padding">4px 12px</style>
          <style property="border-radius">var(--radius-full)</style>
        </element>
        <element name="notice-card__title">
          <style property="font-size">var(--text-xl)</style>
          <style property="font-weight">var(--font-semibold)</style>
          <style property="color">var(--gray-900)</style>
          <style property="margin-bottom">var(--space-2)</style>
        </element>
        <element name="notice-card__date">
          <style property="font-size">var(--text-sm)</style>
          <style property="color">var(--gray-500)</style>
        </element>
      </children>
    </card>

    <modal name="modal">
      <overlay>
        <style property="position">fixed</style>
        <style property="inset">0</style>
        <style property="background">rgba(15, 23, 42, 0.75)</style>
        <style property="backdrop-filter">blur(4px)</style>
        <style property="display">flex</style>
        <style property="align-items">center</style>
        <style property="justify-content">center</style>
        <style property="z-index">1000</style>
        <style property="padding">var(--space-4)</style>
      </overlay>
      <container>
        <style property="background">white</style>
        <style property="border-radius">var(--radius-lg)</style>
        <style property="box-shadow">var(--shadow-xl)</style>
        <style property="max-width">600px</style>
        <style property="width">100%</style>
        <style property="max-height">90vh</style>
        <style property="overflow">auto</style>
      </container>
      <children>
        <element name="modal__header">
          <style property="padding">var(--space-6)</style>
          <style property="border-bottom">1px solid var(--gray-200)</style>
          <style property="display">flex</style>
          <style property="justify-content">space-between</style>
          <style property="align-items">center</style>
        </element>
        <element name="modal__title">
          <style property="font-size">var(--text-2xl)</style>
          <style property="font-weight">var(--font-bold)</style>
          <style property="color">var(--gray-900)</style>
        </element>
        <element name="modal__body">
          <style property="padding">var(--space-6)</style>
        </element>
        <element name="modal__footer">
          <style property="padding">var(--space-6)</style>
          <style property="border-top">1px solid var(--gray-200)</style>
          <style property="display">flex</style>
          <style property="justify-content">flex-end</style>
          <style property="gap">var(--space-3)</style>
        </element>
      </children>
    </modal>

    <navigation name="header">
      <style property="background">white</style>
      <style property="border-bottom">1px solid var(--gray-200)</style>
      <style property="position">sticky</style>
      <style property="top">0</style>
      <style property="z-index">100</style>
      <style property="box-shadow">var(--shadow-sm)</style>
      <container>
        <style property="max-width">1200px</style>
        <style property="margin">0 auto</style>
        <style property="padding">var(--space-4) var(--space-6)</style>
        <style property="display">flex</style>
        <style property="justify-content">space-between</style>
        <style property="align-items">center</style>
        <style property="height">72px</style>
      </container>
      <children>
        <element name="header__logo">
          <style property="display">flex</style>
          <style property="align-items">center</style>
          <style property="gap">var(--space-3)</style>
          <style property="text-decoration">none</style>
          <children>
            <element name="header__logo-image" height="40px"/>
            <element name="header__logo-text">
              <style property="font-size">var(--text-xl)</style>
              <style property="font-weight">var(--font-bold)</style>
              <style property="color">var(--primary-900)</style>
            </element>
          </children>
        </element>
        <element name="header__nav">
          <style property="display">flex</style>
          <style property="gap">var(--space-8)</style>
          <responsive device="mobile">
            <style property="display">none</style>
          </responsive>
        </element>
        <element name="header__nav-link">
          <style property="font-size">var(--text-base)</style>
          <style property="font-weight">var(--font-medium)</style>
          <style property="color">var(--gray-700)</style>
          <style property="text-decoration">none</style>
          <style property="transition">color var(--transition-fast)</style>
          <style property="position">relative</style>
          <states>
            <state name="hover">
              <style property="color">var(--primary-900)</style>
            </state>
            <state name="active">
              <style property="color">var(--primary-900)</style>
              <after>
                <style property="content">""</style>
                <style property="position">absolute</style>
                <style property="bottom">-8px</style>
                <style property="left">0</style>
                <style property="right">0</style>
                <style property="height">3px</style>
                <style property="background">var(--primary-900)</style>
                <style property="border-radius">2px</style>
              </after>
            </state>
          </states>
        </element>
      </children>
    </navigation>

    <navigation name="mobile-menu">
      <button>
        <style property="background">transparent</style>
        <style property="border">none</style>
        <style property="padding">var(--space-2)</style>
        <style property="cursor">pointer</style>
      </button>
      <drawer>
        <style property="position">fixed</style>
        <style property="top">72px</style>
        <style property="left">0</style>
        <style property="right">0</style>
        <style property="bottom">0</style>
        <style property="background">white</style>
        <style property="z-index">99</style>
        <style property="padding">var(--space-6)</style>
        <style property="transform">translateX(100%)</style>
        <style property="transition">transform var(--transition-base)</style>
        <states>
          <state name="open">
            <style property="transform">translateX(0)</style>
          </state>
        </states>
      </drawer>
    </navigation>

    <misc>
      <avatar>
        <style property="width">40px</style>
        <style property="height">40px</style>
        <style property="border-radius">var(--radius-full)</style>
        <style property="object-fit">cover</style>
        <style property="border">2px solid var(--gray-200)</style>
        <variants>
          <variant name="sm" size="32px"/>
          <variant name="lg" size="64px"/>
          <variant name="xl" size="96px"/>
        </variants>
      </avatar>
      <badge>
        <style property="display">inline-flex</style>
        <style property="align-items">center</style>
        <style property="font-size">var(--text-xs)</style>
        <style property="font-weight">var(--font-semibold)</style>
        <style property="padding">4px 12px</style>
        <style property="border-radius">var(--radius-full)</style>
        <variants>
          <variant name="primary" background="var(--primary-100)" color="var(--primary-900)"/>
          <variant name="success" background="#D1FAE5" color="#065F46"/>
          <variant name="warning" background="#FEF3C7" color="#92400E"/>
          <variant name="error" background="#FEE2E2" color="#991B1B"/>
        </variants>
      </badge>
      <like_button>
        <style property="display">inline-flex</style>
        <style property="align-items">center</style>
        <style property="gap">var(--space-2)</style>
        <style property="background">transparent</style>
        <style property="border">1px solid var(--gray-300)</style>
        <style property="padding">8px 16px</style>
        <style property="border-radius">var(--radius-full)</style>
        <style property="cursor">pointer</style>
        <style property="transition">all var(--transition-fast)</style>
        <states>
          <state name="hover">
            <style property="border-color">var(--error)</style>
            <style property="color">var(--error)</style>
            <style property="background">rgba(239, 68, 68, 0.05)</style>
          </state>
          <state name="active">
            <style property="border-color">var(--error)</style>
            <style property="background">var(--error)</style>
            <style property="color">white</style>
          </state>
        </states>
      </like_button>
    </misc>
  </components>

  <pages>
    <page name="메인 페이지">
      <structure>
        <section name="헤더"/>
        <section name="히어로 섹션">
          <content>샤오미코리아 커뮤니티 소개</content>
          <cta>회원가입, 갤러리 보기</cta>
        </section>
        <section name="최신 갤러리 미리보기" items="6"/>
        <section name="최근 공지사항" items="3"/>
        <section name="푸터"/>
      </structure>
    </page>

    <page name="회원가입/로그인">
      <structure>
        <section name="헤더"/>
        <section name="중앙 폼 카드">
          <max_width>480px</max_width>
          <content>
            <item>로고</item>
            <item>제목</item>
            <item>입력 필드들</item>
            <item>버튼</item>
            <item>링크 (다른 페이지 이동)</item>
          </content>
        </section>
        <section name="푸터"/>
      </structure>
      <styling>
        <background>var(--gray-50)</background>
        <card_padding>var(--space-10)</card_padding>
        <card_shadow>var(--shadow-xl)</card_shadow>
      </styling>
    </page>

    <page name="공지사항 게시판">
      <structure>
        <section name="헤더"/>
        <section name="페이지 타이틀"/>
        <section name="관리자 전용 글쓰기 버튼" role="admin"/>
        <section name="검색바"/>
        <section name="게시글 목록">
          <item type="notice-card" repeat="N"/>
        </section>
        <section name="페이지네이션"/>
        <section name="푸터"/>
      </structure>
      <pagination>
        <button_size width="40px" height="40px"/>
        <gap>var(--space-2)</gap>
      </pagination>
    </page>

    <page name="갤러리 페이지">
      <structure>
        <section name="헤더"/>
        <section name="페이지 타이틀"/>
        <section name="업로드 버튼" role="logged_in"/>
        <section name="필터/정렬 옵션"/>
        <section name="갤러리 그리드">
          <grid>
            <columns device="mobile">2</columns>
            <columns device="tablet">3</columns>
            <columns device="desktop">4</columns>
          </grid>
          <item type="gallery-card" repeat="N"/>
        </section>
        <section name="무한 스크롤 or 페이지네이션"/>
        <section name="푸터"/>
      </structure>
    </page>

    <page name="갤러리 상세">
      <structure>
        <section name="헤더"/>
        <section name="뒤로가기 버튼"/>
        <section name="이미지 뷰어">
          <max_height>80vh</max_height>
          <navigation>이전/다음 작품</navigation>
        </section>
        <section name="작품 정보">
          <max_width>800px</max_width>
          <content>
            <item>제목</item>
            <item>작성자 + 프로필</item>
            <item>업로드 날짜</item>
            <item>조회수, 좋아요</item>
            <item>소개 텍스트</item>
            <item>좋아요 버튼</item>
          </content>
        </section>
        <section name="댓글 섹션">
          <content>
            <item>댓글 수</item>
            <item>댓글 목록</item>
            <item>댓글 작성폼 (로그인 필요)</item>
          </content>
        </section>
        <section name="푸터"/>
      </structure>
    </page>

    <page name="관리자 페이지">
      <layout type="sidebar">
        <sidebar width="260px" position="fixed">
          <background>var(--gray-900)</background>
          <color>white</color>
          <sections>
            <item>로고</item>
            <item>네비게이션</item>
          </sections>
        </sidebar>
        <main_content>
          <margin_left>260px</margin_left>
          <padding>var(--space-8)</padding>
          <background>var(--gray-50)</background>
        </main_content>
      </layout>
      <data_table>
        <background>white</background>
        <border_radius>var(--radius-lg)</border_radius>
        <header_background>var(--gray-100)</header_background>
      </data_table>
    </page>
  </pages>

  <responsive>
    <breakpoints>
      <breakpoint name="sm" value="640px" description="작은 태블릿"/>
      <breakpoint name="md" value="768px" description="태블릿"/>
      <breakpoint name="lg" value="1024px" description="데스크탑"/>
      <breakpoint name="xl" value="1280px" description="큰 데스크탑"/>
    </breakpoints>
    <rules>
      <rule device="mobile" breakpoint="&lt;768px">
        <item>갤러리 그리드: 2칸</item>
        <item>네비게이션: 햄버거 메뉴</item>
        <item>폰트 크기: 작게 조정</item>
        <item>패딩/마진: 축소</item>
        <item>버튼: 전체 너비 (선택적)</item>
      </rule>
      <rule device="tablet" breakpoint="768px-1024px">
        <item>갤러리 그리드: 3칸</item>
        <item>네비게이션: 풀 메뉴 (공간 허용 시)</item>
        <item>모달: 80% 너비</item>
      </rule>
      <rule device="desktop" breakpoint="&gt;1024px">
        <item>갤러리 그리드: 4칸</item>
        <item>모든 기능 표시</item>
        <item>호버 효과 활성화</item>
      </rule>
    </rules>
    <touch_optimization>
      <min_touch_target width="44px" height="44px"/>
      <hover_media_query>(hover: none)</hover_media_query>
    </touch_optimization>
  </responsive>

  <accessibility>
    <color_contrast minimum="4.5" standard="WCAG AA" large_text="3:1"/>
    <keyboard_navigation>
      <focus_visible>
        <outline>3px solid var(--primary-900)</outline>
        <outline_offset>2px</outline_offset>
      </focus_visible>
      <tab_order>논리적 흐름</tab_order>
    </keyboard_navigation>
    <semantic_html>
      <tags>header, nav, main, article, section, aside, footer</tags>
      <button_usage>액션 수행 (좋아요, 제출 등)</button_usage>
      <link_usage>페이지 이동</link_usage>
    </semantic_html>
    <screen_reader>
      <aria_label>아이콘 버튼에 필수</aria_label>
      <aria_live>로딩 상태 표시</aria_live>
      <sr_only_class>position: absolute; width: 1px; height: 1px;</sr_only_class>
    </screen_reader>
  </accessibility>

  <performance>
    <images>
      <format primary="WebP" fallback="JPEG"/>
      <compression quality="80-90%"/>
      <responsive use_srcset="true"/>
      <lazy_loading attribute="loading='lazy'"/>
    </images>
    <fonts>
      <preconnect>fonts.googleapis.com</preconnect>
      <preconnect>fonts.gstatic.com</preconnect>
      <display>swap</display>
    </fonts>
    <optimization>
      <css>Critical CSS 인라인, 미사용 제거, 번들 최소화</css>
      <javascript>번들 최소화, 코드 스플리팅, 지연 로딩</javascript>
    </optimization>
  </performance>

  <development>
    <naming_convention type="BEM">
      <block>.gallery-card</block>
      <element>.gallery-card__image</element>
      <modifier>.gallery-card--featured</modifier>
    </naming_convention>
    <css_order>
      <step>1. 레이아웃 (display, position, width, height)</step>
      <step>2. 박스 모델 (margin, padding, border)</step>
      <step>3. 타이포그래피 (font, text)</step>
      <step>4. 시각 효과 (background, color, shadow)</step>
      <step>5. 기타 (cursor, transition, animation)</step>
    </css_order>
    <browser_support>
      <browser name="Chrome" versions="최신 2개"/>
      <browser name="Firefox" versions="최신 2개"/>
      <browser name="Safari" versions="최신 2개"/>
      <browser name="Edge" versions="최신 2개"/>
      <browser name="Mobile Safari" versions="iOS 12+"/>
      <browser name="Mobile Chrome" versions="Android 8+"/>
    </browser_support>
  </development>

  <checklist>
    <category name="디자인 완성도">
      <item>모든 색상이 디자인 시스템에서 정의됨</item>
      <item>일관된 간격 시스템 적용</item>
      <item>타이포그래피 계층 명확</item>
      <item>모든 상태(hover, active, disabled) 정의됨</item>
    </category>
    <category name="반응형">
      <item>모바일 (375px) 테스트</item>
      <item>태블릿 (768px) 테스트</item>
      <item>데스크탑 (1440px) 테스트</item>
      <item>가로 스크롤 없음</item>
    </category>
    <category name="접근성">
      <item>색상 대비 4.5:1 이상</item>
      <item>키보드 네비게이션 가능</item>
      <item>모든 이미지에 alt 속성</item>
      <item>폼 레이블 연결</item>
    </category>
    <category name="성능">
      <item>이미지 최적화 (WebP)</item>
      <item>레이지 로딩 적용</item>
      <item>CSS/JS 번들 최소화</item>
      <item>첫 화면 로딩 3초 이내</item>
    </category>
  </checklist>
</ui_ux_specification>
```
