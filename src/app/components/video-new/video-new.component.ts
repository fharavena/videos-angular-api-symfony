import { Component, OnInit } from "@angular/core";
import { Video } from "src/app/models/video";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { VideoService } from "src/app/services/video.service";

@Component({
  selector: "app-video-new",
  templateUrl: "./video-new.component.html",
  styleUrls: ["./video-new.component.css"],
  providers: [UserService, VideoService]
})
export class VideoNewComponent implements OnInit {
  public page_title: string;
  public video: Video;
  public identity;
  public token;
  public status;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Guardar un nuevo video favorito";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.video = new Video(1, this.identity.sub, "", "", "", "", null, null);
  }

  onSubmit(form) {
    this._videoService.create(this.token, this.video).subscribe(
      response => {
        if (response.status == "success") {
          this.status = "success";
          this._router.navigate(["/inicio"]);
        } else {
          this.status = "error";
        }
      },
      error => {
        this.status = "error";
        console.log(error);
      }
    );
  }
}
