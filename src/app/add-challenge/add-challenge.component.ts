import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ChallengesStoreService, ChallengeStoreDto} from '../challenges/challenges-store.service';
import {LoaderService} from '../layout/loader/loader.service';
import {SegmentStravaService} from '../segment/segment-strava.serivce';
import {SegmentStoreService} from '../segment/segment-store.serivce';
import {Segment} from '../segment/segment';
import {Athlete} from '../athlete/athlete';
import {Location} from '@angular/common';
import {Challenge} from '../challenge/challenge';
import {SyncService} from '../sync.service';

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
    challenge: Challenge;
    title = 'Add Challenge';
    name: FormControl;
    startDate: FormControl;
    segmentIds: FormControl;
    endDate: FormControl;

    constructor(private route: ActivatedRoute,
                private location: Location,
                private sync: SyncService,
                private challengeService: ChallengesStoreService,
                private segmentStravaService: SegmentStravaService,
                private segmentStoreService: SegmentStoreService,
                private router: Router,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { challenge: Challenge }) => this.challenge = data.challenge);
        this.name = new FormControl('', Validators.required);
        this.startDate = new FormControl('', Validators.required);
        this.segmentIds = new FormControl('', Validators.required);
        this.endDate = new FormControl('', [Validators.required]);
        this.athlete = Athlete.loadToLocalStorage();
        if (this.challenge && this.challenge.isCreatedBy(this.athlete)) {
            this.initValue();
        }
        this.myForm = new FormGroup({
            name: this.name,
            segmentIds: this.segmentIds,
            startDate: this.startDate,
            endDate: this.endDate
        });
    }

    private initValue() {
        this.title = 'Edit Challenge';
        this.name.setValue(this.challenge.name);
        this.segmentIds.setValue(Segment.ids(this.challenge.segments).join(','));
        this.endDate.setValue(this.challenge.endDate.toISOString().slice(0, -8));
        this.startDate.setValue(this.challenge.startDate.toISOString().slice(0, -8));
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
                            this.sync.start(this.loaderService);
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
            id: this.challenge ? this.challenge.id : null,
            name: this.name.value,
            createdBy: this.athlete.id,
            active: true,
            startDate: this.startDate.value,
            endDate: this.endDate.value,
            segmentIds: this.segmentIds.value.split(','),
            athleteIds: this.challenge ? Athlete.ids(this.challenge.athletes) : []
        };
    }
}
