import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChallengesStoreService, ChallengeStoreDto} from '../challenges/challenges-store.service';
import {LoaderService} from '../layout/loader/loader.service';
import {SegmentStravaService} from '../segment/segment-strava.serivce';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {Segment} from '../segment/segment';
import {Athlete} from '../athlete/athlete';

@Component({
    selector: 'app-add-challenge',
    templateUrl: './add-challenge.component.html',
    styleUrls: ['./add-challenge.component.css']
})
export class AddChallengeComponent implements OnInit {
    formSubmitted = false;
    errorMessage = '';
    myForm: FormGroup;
    athlete: Athlete;

    name: FormControl;
    startDate: FormControl;
    segmentIds: FormControl;
    endDate: FormControl;

    constructor(private challengeService: ChallengesStoreService,
                private segmentStravaService: SegmentStravaService,
                private segmentStoreService: SegmentStoreService,
                private router: Router,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.name = new FormControl('', Validators.required);
        this.startDate = new FormControl('', Validators.required);
        this.segmentIds = new FormControl('', Validators.required);
        this.endDate = new FormControl('', [Validators.required]);
        this.athlete = Athlete.loadToLocalStorage();
        this.myForm = new FormGroup({
            name: this.name,
            segmentIds: this.segmentIds,
            startDate: this.startDate,
            endDate: this.endDate
        });
    }


    addChallenge() {
        this.loaderService.showLoader();
        this.errorMessage = '';
        const challenge = this.readChallenge();
        this.segmentStravaService.segmentByIds(challenge.segmentIds)
            .subscribe(segments => {
                    this.segmentStoreService.add(segments.map(dto => Segment.initFromStrava(dto)));
                    this.challengeService.add(challenge)
                        .subscribe(() => {
                            this.formSubmitted = true;
                            this.loaderService.hideLoader();
                            this.router.navigateByUrl('/challenges');
                        });
                },
                error => {
                    this.formSubmitted = false;
                    this.errorMessage = 'Some of the segments cannot be found: ' + challenge.segmentIds;
                    this.loaderService.hideLoader();
                });
    }

    private readChallenge(): ChallengeStoreDto {
        return {
            id: null,
            name: this.name.value,
            createdBy: this.athlete.id,
            active: true,
            startDate: this.startDate.value,
            endDate: this.endDate.value,
            segmentIds: this.segmentIds.value.split(','),
            athleteIds: []
        };
    }
}
