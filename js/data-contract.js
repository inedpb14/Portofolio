(function () {
  const pagePath = window.location.pathname;
  const isNestedPage = pagePath.includes("/pages/");
  const apiRoot = isNestedPage ? "../api/" : "api/";

  async function getJson(fileName) {
    const response = await fetch(`${apiRoot}${fileName}.json`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Data file "${fileName}.json" gagal dimuat (${response.status}).`);
    }
    return response.json();
  }

  async function getPortfolioData() {
    const [profile, navigation, skills, projects, experience, achievements, contact, pages, projectDetails] =
      await Promise.all([
        getJson("profile"),
        getJson("navigation"),
        getJson("skills"),
        getJson("projects"),
        getJson("experience"),
        getJson("achievements"),
        getJson("contact"),
        getJson("pages"),
        getJson("project-details"),
      ]);

    if (!profile.name || !Array.isArray(navigation) || !Array.isArray(skills) || !Array.isArray(projects) ||
        !Array.isArray(experience) || !Array.isArray(achievements) || !contact.links || !pages || !projectDetails) {
      throw new Error("Kontrak data portfolio tidak lengkap. Periksa file JSON di folder api.");
    }

    return Object.freeze({ profile, navigation, skills, projects, experience, achievements, contact, pages, projectDetails });
  }

  window.PortfolioData = Object.freeze({ getJson, getPortfolioData });
})();