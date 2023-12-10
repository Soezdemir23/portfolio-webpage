import { Octokit } from "@octokit/rest";
import { type GithubInterface } from "./githubInterface";

const octokit = new Octokit({
  auth: import.meta.env.GITHUB_API,
});
async function getGithubInformation(): Promise<
  GithubInterface[]
> {
  const response =
    await octokit.rest.repos.listForAuthenticatedUser(
      {
        per_page: 100,
        affiliation: "owner",
        sort: "updated",
        visibility: "public",
      }
    );

  const responseShortened =
    await response.data.slice(0, 6);

  const githubInfos: GithubInterface[] = [];

  for (const repo of responseShortened) {
    let result: string | undefined;
    try {
      const responseReadMe =
        await octokit.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          {
            owner: repo.owner.login,
            repo: repo.name,
            path: "Screenshot.png",
          }
        );
      result = responseReadMe.data.download_url;
    } catch (error) {
      console.error(
        "repo with name: " +
          repo.name +
          "\nMakes problems"
      );

      result = undefined;
    }

    const repoObject: GithubInterface = {
      name: repo.name,
      fullName: repo.full_name,
      ownerLogin: repo.owner.login,
      htmlURL: repo.html_url,
      createdAt: new Date(repo.created_at!),
      updatedAt: new Date(repo.updated_at!),
      homepage: repo.homepage!,
      description: repo.description,
      screenshot: result,
    };

    githubInfos.push(repoObject);
  }

  for (const repo of responseShortened) {
  }
  return githubInfos;
}

export { getGithubInformation };
