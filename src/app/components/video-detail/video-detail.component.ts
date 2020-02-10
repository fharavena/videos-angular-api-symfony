import { Component, OnInit } from "@angular/core";
import { Video } from "src/app/models/video";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { VideoService } from "src/app/services/video.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-video-detail",
  templateUrl: "./video-detail.component.html",
  styleUrls: ["./video-detail.component.css"],
  providers: [UserService, VideoService]
})
export class VideoDetailComponent implements OnInit {
  public identity;
  public token;
  public video: Video;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService,
    private _sanitizer: DomSanitizer
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo() {
    this._route.params.subscribe(params => {
      var id = +params["id"];

      this._videoService.getVideo(this.token, id).subscribe(
        response => {
          if (response.status == "success") {
            this.video = response.video;
          } else {
            this._router.navigate(["/inicio"]);
          }
        },
        error => {
          console.log(error);
          this.status = "error";
        }
      );
    });
  }

  getVideoIframe(url) {
    var video, results;

    if (url === null) {
      return "";
    }
    results = url.match("[\\?&]v=([^&#]*)");
    video = results === null ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.youtube.com/embed/" + video
    );
  }
}
