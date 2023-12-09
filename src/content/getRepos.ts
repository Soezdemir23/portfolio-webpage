import { Octokit } from "@octokit/rest";
import { type GithubInterface } from "../../githubInterface";

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

  const data = response.data;
  const githubInfos: GithubInterface[] = [];

  for (const repo of data.slice(0, 6)) {
    const repoObject: GithubInterface = {
      name: repo.name,
      fullName: repo.full_name,
      ownerLogin: repo.owner.login,
      htmlURL: repo.html_url,
      createdAt: new Date(repo.created_at!),
      updatedAt: new Date(repo.updated_at!),
      homepage: repo.homepage!,
      description: repo.description,
      heroImage: repo,
    };

    githubInfos.push(repoObject);
  }

  return githubInfos;
}
export { getGithubInformation };
