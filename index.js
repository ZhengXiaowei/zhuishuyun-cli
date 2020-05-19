#!/usr/bin/env node
const clone = require("git-clone");
const program = require("commander");
const shell = require("shelljs");
const log = require("tracer").colorConsole();

program
  .version("0.0.1")
  .description("追书云移动端项目基础模板")
  .program.command("create <project_name> [template]")
  .option("-tsx, --typescript", "typescript tsx template")
  .action(function (project, template, cmd) {
    var ts_tpl = !!cmd.typescript;
    log.info(`zhuishuyun create ${project} ${ts_tpl ? "--tsx" : ""}`);
    if (project) {
      var pwd = shell.pwd();
      var url = "https://github.com/ZhengXiaowei/base-job-template.git";
      if (ts_tpl)
        url = "https://github.com/ZhengXiaowei/base-vue-tsx-template.git";
      log.info("正在拉取远端模板，请稍等..");
      clone(url, pwd + `/${project}`, null, function () {
        shell.rm("-rf", pwd + `/${project}/.git`);
        log.info("模板已建立");
      });
    } else {
      log.error("请填写正确的项目名称！");
    }
  });

program.parse(process.argv);
